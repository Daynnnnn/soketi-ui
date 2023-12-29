type EventType = {
    key: string;
    label: string;
}

export const eventTypes: EventType[] = [
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