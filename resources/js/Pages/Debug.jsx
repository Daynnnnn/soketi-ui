import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js'
import { getEventType } from '@/utils/eventTypes';
import ActivePill from '@/Components/ActivePill';
import { ArrowsClockwise } from 'phosphor-react';

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
            <div key={event.email} className='grid grid-cols-4 cursor-pointer items-center' onClick={() => setActive((previous) => !previous)}>
                <div className="whitespace-nowrap px-3 py-4 text-sm w-32">
                    <ActivePill key={event.type} active={true} label={getEventType(event.type).label} />
                </div>
                <p className="whitespace-nowrap px-3 py-4 text-sm">{event.channel}</p>
                <p className="whitespace-nowrap px-3 py-4 text-sm">{event.user_id}</p>
                <p className="whitespace-nowrap px-3 py-4 text-sm">{event.pusher_created_at}</p>
            </div>
            {active && <EventInfo event={event} />}
        </>
    );
}


export default function Debug(props) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const pusher = new Pusher('app-key', {
            cluster: 'eu',
            wsHost: '127.0.0.1',
            wsPort: 6001,
            forceTLS: false,
            encrypted: true,
            enabledTransports: ['ws', 'wss'],
        });

        const channel = pusher.subscribe('events:' + props.app.id);

        channel.bind("App\\Events\\NewDebugEvents", (data) => updateEvents(data));

        return () => {
            pusher.disconnect();
        };
    }, []);

    const updateEvents = (newEvents) => {
        setEvents((previousEvents) => {
            let events = [...previousEvents, ...newEvents];

            if (events.length <= 5) {
                return events;
            }

            events = events.splice(events.length - 5);

            return events.reverse();
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Debug</h2>}
        >
            <Head title="Debug" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='w-full min-h-96 overflow-y-scroll'>
                        <div className="px-4 sm:px-6 lg:px-8">
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <div className="min-w-full divide-y divide-gray-300">
                                    <div className="grid grid-cols-4 bg-gray-50">
                                        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Event Type
                                        </div>
                                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Channel
                                        </div>
                                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            User ID
                                        </div>
                                        <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Created At
                                        </div>
                                    </div>
                                    {events.length ? (
                                        <div className="divide-y divide-gray-200 bg-white">
                                            {events.map((event) => <DebugCard key={event.uuid} event={event} />)}
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
        </AuthenticatedLayout>
    );
}
