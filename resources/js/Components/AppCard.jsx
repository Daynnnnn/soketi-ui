import { useState } from 'react'
import AddButton from './AddButton';
import EditButton from './EditButton';
import LabelledCard from './LabelledCard';
import LimitsModal from './LimitsModal';
import WebhookCard from './WebhookCard';
import WebhookModal from './WebhookModal';
import RefreshButton from './RefreshButton';
import Modal from './Modal';
import DangerButton from './DangerButton';
import SecondaryButton from './SecondaryButton';
import { router } from '@inertiajs/react';

const limitItems = [
    {
        key: 'max_connections',
        label: 'Max Connections',
    },
    {
        key: 'max_backend_events_per_sec',
        label: 'Max Backend Events Per Second',
    },
    {
        key: 'max_client_events_per_sec',
        label: 'Max Client Events Per Second',
    },
    {
        key: 'max_presence_members_per_channel',
        label: 'Max Presence Members Per Channel',
    },
    {
        key: 'max_presence_member_size_in_kb',
        label: 'Max Presence Member Size (KB)',
    },
    {
        key: 'max_channel_name_length',
        label: 'Max Channel Name Length',
    },
    {
        key: 'max_event_channels_at_once',
        label: 'Max Event Channels At Once',
    },
    {
        key: 'max_read_req_per_sec',
        label: 'Max Read Requests Per Second',
    },
    {
        key: 'max_event_name_length',
        label: 'Max Event Name Length',
    },
    {
        key: 'max_event_payload_in_kb',
        label: 'Max Event Payload (KB)',
    },
    {
        key: 'max_event_batch_size',
        label: 'Max Event Batch Size',
    },
];

export default function AppCard({ app }) {
    const [refreshCredentialsModalOpen, setRefreshCredentialsModalOpen] = useState(false);
    const [limitsModalOpen, setLimitsModalOpen] = useState(false);
    const [webhookModalOpen, setWebhookModalOpen] = useState(false);
    const [currentWebhookId, setCurrentWebhookId] = useState(null);

    const createWebhook = () => {
        setCurrentWebhookId(null);
        setWebhookModalOpen(true);
    };

    const editWebhook = (webhookId) => {
        setCurrentWebhookId(webhookId);
        setWebhookModalOpen(true);
    };

    const refreshCredentials = () => {
        router.post('/apps/' + app.id + '/refresh-credentials', {}, {
            onSuccess: () => {
                setRefreshCredentialsModalOpen(false)
            },
        });
    };

    return (
        <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900 space-y-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold'>{app.name}</h2>
                    <div className='flex items-center space-x-4'>
                        <a className='transition-colors duration-150 bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg' href={'/apps/' + app.id + '/debug'}>Debug</a>
                        <div className={'w-8 h-8 rounded-full ' + (app.enabled ? 'bg-green-500 shadow-lg' : 'bg-gray-500')} />
                    </div>
                </div>
                <div>
                    <div>
                        <div className='flex items-center'>
                            <RefreshButton onClick={() => setRefreshCredentialsModalOpen(true)} />
                            <h3 className='pl-1 text-lg font-bold'>App Keys</h3>
                        </div>
                        <div className='mt-2 p-4 bg-gray-100 inline-block rounded-lg'>
                            <p>App ID: <span className='font-bold'>{app.id}</span></p>
                            <p>App Key: <span className='font-bold'>{app.key}</span></p>
                            <p>App Secret: <span className='font-bold'>{app.secret}</span></p>
                        </div>
                    </div>

                    <Modal show={refreshCredentialsModalOpen} onClose={() => setRefreshCredentialsModalOpen(false)}>
                        <div className='p-6'>
                            <h2 className="text-lg font-medium text-gray-900">
                                Are you sure you want to refresh this apps credentials?
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Once your credentials have been reset, no applications you've already setup<br />
                                will be able to authenticate against Soketi until you update the keys.
                            </p>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={() => setRefreshCredentialsModalOpen(false)}>Cancel</SecondaryButton>

                                <DangerButton className="ml-3" onClick={refreshCredentials}>
                                    Refresh Credentials
                                </DangerButton>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div>
                    <div className='flex items-center'>
                        <EditButton onClick={() => setLimitsModalOpen(true)} />
                        <h3 className='pl-1 text-lg font-bold'>Limits</h3>
                    </div>
                    <div className='pt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {limitItems.map(limitItem => <LabelledCard key={limitItem.key} label={limitItem.label} value={! app[limitItem.key] ? '∞' : app[limitItem.key]} />)}
                    </div>
                    <LimitsModal app={app} limitItems={limitItems} show={limitsModalOpen} setShow={setLimitsModalOpen} />
                </div>
                <div>
                    <div className='flex items-center'>
                        <AddButton onClick={createWebhook} />
                        <h3 className='pl-1 text-lg font-bold'>Webhooks</h3>
                    </div>
                    <div className='pt-2 grid lg:grid-cols-2 gap-2'>
                        {app.webhooks && app.webhooks.map((webhook, index) => <WebhookCard key={index} appId={app.id} webhook={webhook} onEdit={() => editWebhook(webhook.id)} />)}
                    </div>
                    {! app.webhooks?.length && (
                        <div className='p-4 border border-dashed text-gray-500 border-gray-200 shadow-sm rounded-xl'>
                            No webhooks configured
                        </div>
                    )}
                    <WebhookModal app={app} currentWebhookId={currentWebhookId} show={webhookModalOpen} setShow={setWebhookModalOpen} />
                </div>
            </div>
        </div>
    );
}
