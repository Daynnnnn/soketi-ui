import ActivePill from "./ActivePill";
import { eventTypes } from "@/utils/eventTypes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Modal from "./Modal";
import DangerButton from "./DangerButton";
import SecondaryButton from "./SecondaryButton";
import { useState } from "react";
import { router } from '@inertiajs/react'

const WebhookCard = ({ appId, webhook, onEdit }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const onDelete = () => {
        router.post('/apps/' + appId + '/webhooks/delete', {
            id: webhook.id,
        });
    };

    return (
        <div className='relative grid gap-4 p-4 border border-gray-200 shadow-sm rounded-xl'>
            <EditButton className="absolute right-12 top-4" onClick={onEdit} />
            <DeleteButton className="absolute right-4 top-4" onClick={() => setDeleteModalOpen(true)} />
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
            <Modal show={deleteModalOpen} onClose={setDeleteModalOpen}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete this webhook?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={() => setDeleteModalOpen(false)}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" onClick={onDelete}>
                            Delete Webhook
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default WebhookCard;
