import AddButton from './AddButton';
import EditButton from './EditButton';
import LabelledCard from './LabelledCard';
import WebhookCard from './WebhookCard';

export default function AppCard({ app }) {
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
            key: 'max_read_req_events_per_sec',
            label: 'Max Read Request Events Per Second',
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

    return (
        <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 text-gray-900'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-bold'>{app.name}</h2>
                    <div className={'w-8 h-8 rounded-full ' + (app.enabled ? 'bg-green-500 shadow-lg' : 'bg-gray-500')} />
                </div>
                <div className='pt-6'>
                    <div className='flex items-center'>
                        <EditButton href={`/apps/${app.id}/limits`} />
                        <h3 className='pl-1 text-lg font-bold'>Limits</h3>
                    </div>
                    <div className='pt-2 grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {limitItems.map(limitItem => <LabelledCard key={limitItem.key} label={limitItem.label} value={! app[limitItem.key] ? '∞' : app[limitItem.key]} />)}
                    </div>
                </div>
                <div className='pt-6'>
                    <div className='flex items-center'>
                        <AddButton href={`/apps/${app.id}/webhooks/create`} />
                        <h3 className='pl-1 text-lg font-bold'>Webhooks</h3>
                    </div>
                    <div className='pt-2 grid lg:grid-cols-2 gap-2'>
                        {app.webhooks.map((webhook, index) => <WebhookCard key={index} webhook={webhook} />)}
                    </div>
                    {! app.webhooks.length && (
                        <div className='p-4 border border-dashed text-gray-500 border-gray-200 shadow-sm rounded-xl'>
                            No webhooks configured
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
