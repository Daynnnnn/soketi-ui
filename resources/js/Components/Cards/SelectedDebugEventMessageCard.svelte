<script>
    export let selectedEventMessage;
    export let debug_events
</script>

<div class="flex items">
    <div class="bg-gray-800 text-white rounded-l-lg grow">
        <div class="p-4">
            <pre>{debug_events[selectedEventMessage] !== null ? JSON.stringify(debug_events[selectedEventMessage], null, " ") : "No message attached to this event!"}</pre>
        </div>
    </div>
    <div on:click={() => selectedEventMessage = false} class="cursor-pointer bg-gray-400 text-white rounded-r-lg">
        <div class="my-auto p-4">
            X
        </div>
    </div>
</div>
