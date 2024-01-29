import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import Pusher from 'pusher-js'
import { getEventType } from '@/utils/eventTypes';
import ActivePill from '@/Components/ActivePill';
import { ArrowsClockwise } from 'phosphor-react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import PrimaryButton from '@/Components/PrimaryButton';

const EventInfo = ({ event }) => {
    return (
        <div className='w-full col-span-4'>
            <pre className='p-8 bg-gray-800 text-white'>
                {JSON.stringify(event, null, '  ')}
            </pre>
        </div>
    )
}

const DebugCard = ({ event }) => {
    const [active, setActive] = useState(false);

    return (
        <>
            <div key={event.email} className='grid grid-cols-5 cursor-pointer items-center' onClick={() => setActive((previous) => !previous)}>
                <div className="whitespace-nowrap px-3 py-4 text-sm col-span-1">
                    <ActivePill key={event.name} active={true} label={getEventType(event.name)?.label} />
                </div>
                <p className="whitespace-nowrap px-3 py-4 text-sm col-span-3">{event.channel}</p>
                <p className="whitespace-nowrap px-3 py-4 text-sm col-span-1">{event.pusher_created_at}</p>
            </div>
            {active && <EventInfo event={event} />}
        </>
    );
}


export default function Debug(props) {
    const { app, pusherConfig } = props;

    const [events, setEvents] = useState([]);
    const [pauseEvents, setPauseEvents] = useState(false);
    const [showAddDebuggingWebhookModal, setShowAddDebuggingWebhookModal] = useState(false);

    useEffect(() => {
        const pusher = new Pusher(pusherConfig.appKey, {
            cluster: pusherConfig.cluster,
            wsHost: pusherConfig.host,
            wsPort: pusherConfig.port,
            wssPort: pusherConfig.port,
            forceTLS: pusherConfig.forceTLS,
            encrypted: true,
            enabledTransports: ['ws', 'wss'],
        });

        const channel = pusher.subscribe('events_' + props.app.id);

        channel.bind("App\\Notifications\\NewDebugEvents", (data) => updateEvents(data));

        return () => {
            pusher.disconnect();
        };
    }, [pauseEvents]);

    const hasDebuggingWebhook = useMemo(() => !!app.webhooks?.find((app) => app.debug), [app]);

    const updateEvents = (newEvents) => {
        if (pauseEvents) {
            return;
        }

        setEvents((previousEvents) => {
            let events = [...previousEvents, ...newEvents];

            if (events.length <= 50) {
                return events;
            }

            events = events.splice(events.length - 50);

            return events.reverse();
        })
    }

    const toggleDebuggingWebhook = () => {
        router.post('/apps/' + app.id + '/toggle-debug', {}, {
            onSuccess: () => setShowAddDebuggingWebhookModal(false),
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={(
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Debug</h2>
                    {!hasDebuggingWebhook && (
                        <button onClick={() => setShowAddDebuggingWebhookModal(true)} className='bg-indigo-500 text-white px-4 py-2 rounded-lg'>
                            Add debugging webhook
                        </button>
                    )}
                </div>
            )}
        >
            <Head title="Debug" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='w-full min-h-96 overflow-y-scroll'>
                        <div className="px-4 sm:px-6 lg:px-8">
                        <div>
                            <button onClick={() => setPauseEvents(!pauseEvents)} className='bg-indigo-500 text-white px-4 py-2 rounded-lg'>
                                {pauseEvents ? 'Resume Events' : 'Pause Events'}
                            </button>
                        </div>
                        <div className="mt-4 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <div className="min-w-full divide-y divide-gray-300">
                                    <div className="grid grid-cols-5 bg-gray-50">
                                        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 col-span-1">
                                            Event Type
                                        </div>
                                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 col-span-3">
                                            Channel
                                        </div>
                                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 col-span-1">
                                            Created At
                                        </div>
                                    </div>
                                    {events.length ? (
                                        <div className="divide-y divide-gray-200 bg-white">
                                            {events.map((event) => <DebugCard key={event.debug_uuid} event={event} />)}
                                        </div>
                                    ) : (
                                        <div className='py-4 flex flex-col w-full'>
                                            <div className='flex items-center mx-auto space-x-2'>
                                                <div className='animate-spin'>
                                                    <ArrowsClockwise className='text-gray-500' />
                                                </div>
                                                <p className='text-gray-500'>Listening for events...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showAddDebuggingWebhookModal} onClose={setShowAddDebuggingWebhookModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to enable the debugging webhook?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        If this is a high throughput app, this could cause performace issues
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setShowAddDebuggingWebhookModal(false)}>Cancel</SecondaryButton>

                        <PrimaryButton className="ml-3" onClick={toggleDebuggingWebhook}>
                            Add debugging webhook
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
