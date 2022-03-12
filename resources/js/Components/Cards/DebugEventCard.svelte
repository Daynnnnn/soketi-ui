<script>
    import Dropdown from 'svelte-icons/go/GoChevronDown.svelte'

    export let debug_event;

    let isActive = false;
</script>
<div>
<div on:click={() => isActive = !isActive} class="{(debug_event.data !== null) ? "cursor-pointer" : ""} w-full relative {(debug_event.data !== null && isActive) ? "rounded-t-lg" : "rounded-lg"} border border-gray-300 px-6 py-5 shadow-sm flex items-center space-x-3 transition duration-200 hover:bg-gray-50 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="flex items-center w-full text-center divide-x">
        <div class="w-1/3">
            <h1 class="font-bold">Event</h1>
            <p>{debug_event.event_type}</p>
        </div>
        <div class="w-1/3">
            <h1 class="font-bold">Details</h1>
            <p><b>Channel:</b> {debug_event.channel}</p>
            {#if debug_event.event}
            <p><b>Event:</b> {debug_event.event}</p>
            {/if}
            {#if debug_event.user_id}
            <p><b>User ID:</b> {debug_event.user_id}</p>
            {/if}
        </div>
        <div class="w-1/3">
            <h1 class="font-bold">Time</h1>
            <p>{debug_event.pusher_created_at}</p>
        </div>
    </div>
    {#if debug_event.data !== null}
    <div class="transition duration-300 h-8 {isActive ? "" : "-rotate-90"}">
        <Dropdown />
    </div>
    {/if}
</div>
{#if debug_event.data !== null && isActive}
<div class="bg-gray-800 text-white rounded-b-lg">
    <div class="p-4">
        <pre>{JSON.stringify(debug_event.data, null, " ")}</pre>
    </div>
</div>
{/if}
</div>