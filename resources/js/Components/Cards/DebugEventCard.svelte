<script>
    export let debugEvent;

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

    let active = false;

    const friendlyEvent = (event, key) => events[event][key];
</script>

<div class="rounded-xl {active ? "border-2 border-gray-800" : "border border-gray-200"}">
    <div on:click={() => active = !active} class="cursor-pointer flex items-center p-2">
        <div class="w-1/5">
            <div class="inline-block rounded-full py-1 px-2 {friendlyEvent(debugEvent.name, 'class')}">
                {friendlyEvent(debugEvent.name, 'name')}
            </div>
        </div>
        <div class="w-1/3">
            {debugEvent.channel ?? 'N/A'}
        </div>
        <div class="w-1/3">
            {debugEvent.user_id ?? 'N/A'}
        </div>
        <div class="w-1/5">
            {debugEvent.pusher_created_at}
        </div>
    </div>
    
    {#if active}
    <div class="rounded-b-xl bg-gray-800 text-white">
        <div class="p-4">
            <pre>{debugEvent !== null ? JSON.stringify(debugEvent, null, " ") : "No message attached to this event!"}</pre>
        </div>
    </div>
    {/if}    
</div>
