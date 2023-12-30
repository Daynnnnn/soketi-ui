type EventType = {
    key: string;
    label: string;
    color: string;
}

export const eventTypes: EventType[] = [
    {
        key: 'client_event',
        label: 'Client Events',
        color: 'blue-500'
    },
    {
        key: 'channel_occupied',
        label: 'Channel Occupied',
        color: 'yellow-500',
    },
    {
        key: 'channel_vacated',
        label: 'Channel Vacated',
        color: 'purple-500',
    },
    {
        key: 'member_added',
        label: 'Member Added',
        color: 'green-500',
    },
    {
        key: 'member_removed',
        label: 'Member Removed',
        color: 'red-500',
    },
];

export const getEventType = (event_type: string) => eventTypes.find(({ key }) => key === event_type);
