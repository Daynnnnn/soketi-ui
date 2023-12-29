import ActivePill from "./ActivePill";
import { eventTypes } from "@/utils/eventTypes";
import EditButton from "./EditButton";

const WebhookCard = ({ webhook, onEdit }) => {
    return (
        <div className='relative grid gap-4 p-4 border border-gray-200 shadow-sm rounded-xl'>
            <EditButton className="absolute right-4 top-4" onClick={onEdit} />
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
            {webhook.filter && (
                <div>
                    <p className="font-semibold text-gray-500">Filters</p>
                    {Object.keys(webhook.filter ?? {}).map((filter) => (
                        <div key={filter} className="flex">
                            <p className="text-gray-500">{filter}: </p>
                            <p className="pl-2 font-semibold">{webhook.filter[filter]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default WebhookCard;
