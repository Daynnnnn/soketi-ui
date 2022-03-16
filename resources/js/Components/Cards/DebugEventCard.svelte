<script>
    export let debug_event;
    export let selectedEventMessage;
    export let i;

    const events = {
        client_event: {
            name: 'Client Event',
            class: "border-2 border-green-600",
        },
        channel_occupied: { 
            name: 'Channel Occupied',
            class: "border-2 border-purple-600",
        },
        channel_vacated: {
            name: 'Channel Vacated',
            class: "border-2 border-orange-300",
        },
        member_added: {
            name: 'Member Added',
            class: "border-2 border-blue-600",
        },
        member_removed: {
            name: 'Member Removed',
            class: "border-2 border-red-600",
        },
    };

    const friendlyEvent = (event, key) => events[event][key];
</script>

<div on:click={() => selectedEventMessage = i} class="cursor-pointer w-full relative rounded-lg {selectedEventMessage === i ? "border-2 border-indigo-300" : "border border-gray-300"} py-5 shadow-sm flex items-center space-x-3 transition duration-200 hover:bg-gray-50 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="flex flex-col items-center w-full text-center divide-y">
        <div class="w-full pb-2">
            <div class="inline-block px-2 py-0.5 rounded-full {friendlyEvent(debug_event.event_type, 'class')}">
                <p class="text-lg">{friendlyEvent(debug_event.event_type, 'name')}</p>
            </div>
            <p class="text-sm text-gray-500 pt-1">{debug_event.pusher_created_at}</p>
        </div>
        <div class="w-full pt-2">
            <p><b>Channel:</b> {debug_event.channel}</p>
            {#if debug_event.event}
            <p><b>Event:</b> {debug_event.event}</p>
            {/if}
            {#if debug_event.user_id}
            <p><b>User ID:</b> {debug_event.user_id}</p>
            {/if}
        </div>
    </div>
</div>