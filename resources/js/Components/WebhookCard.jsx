import ActivePill from "./ActivePill";

const WebhookCard = ({ webhook }) => {
    const eventTypes = [
        {
            key: 'client_event',
            label: 'Client Events',
        },
        {
            key: 'channel_occupied',
            label: 'Channel Occupied',
        },
        {
            key: 'channel_vacated',
            label: 'Channel Vacated',
        },
        {
            key: 'member_added',
            label: 'Member Added',
        },
        {
            key: 'member_removed',
            label: 'Member Removed',
        },
    ];

    return (
        <div className='grid gap-4 p-4 border border-gray-200 shadow-sm rounded-xl'>
            <div>
                <p className="font-semibold text-gray-500">Type</p>
                <p className="font-semibold">{webhook.url ? 'HTTP' : 'Lambda Function'}</p>
            </div>
            <div>
                <p className="font-semibold text-gray-500">{webhook.url ? 'URL' : 'Lambda Function ARN'}</p>
                <p className="font-semibold">{webhook.url ?? webhook.lambda_function}</p>
            </div>
            <div>
                <p className="font-semibold text-gray-500">Event Types</p>
                <div className="pt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {eventTypes.map((eventType) => <ActivePill key={eventType.key} active={webhook.event_types.find(type => type === eventType.key)} label={eventType.label} />)}
                </div>
            </div>
            <div>
                <p className="font-semibold text-gray-500">Filters</p>
                {Object.keys(webhook.filter ?? {}).map((filter) => (
                    <div key={filter} className="flex">
                        <p className="text-gray-500">{filter}: </p>
                        <p className="pl-2 font-semibold">{webhook.filter[filter]}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WebhookCard;
