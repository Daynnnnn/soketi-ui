<script>
    export let debugEvent;
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

<div on:click={() => selectedEventMessage = i} class="cursor-pointer w-full relative rounded-lg {selectedEventMessage === i ? "border-2 border-gray-600 bg-gray-50" : "border border-gray-300 hover:border-gray-400 hover:bg-gray-50"} py-5 shadow-sm flex items-center space-x-3 transition duration-200   focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="flex flex-col items-center w-full text-center divide-y">
        <div class="w-full pb-2">
            <div class="inline-block px-2 py-0.5 rounded-full {friendlyEvent(debugEvent.name, 'class')}">
                <p class="text-lg">{friendlyEvent(debugEvent.name, 'name')}</p>
            </div>
            <p class="text-sm text-gray-500 pt-1">{debugEvent.pusher_created_at}</p>
        </div>
        <div class="w-full pt-2">
            <p><b>Channel:</b> {debugEvent.channel}</p>
            {#if debugEvent.event}
            <p><b>Event:</b> {debugEvent.event}</p>
            {/if}
            {#if debugEvent.user_id}
            <p><b>User ID:</b> {debugEvent.user_id}</p>
            {/if}
        </div>
    </div>
</div>