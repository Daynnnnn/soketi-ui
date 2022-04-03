<script>
    import Pusher from 'pusher-js';

    import Button from "../../../Components/Inputs/Button.svelte"
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import DebugEvent from "../../../Components/Cards/DebugEventCard.svelte"
    import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte'

    export let app;
    export let debugEvents;

    let selectedEventMessage = false;

    const pusher = new Pusher('app-key', {
        wsHost: '127.0.0.1',
        wsPort: 6001,
        forceTLS: false,
        encrypted: true,
        enabledTransports: ['ws', 'wss'],
    });

    const channel = pusher.subscribe('debug-events_' + app['appId']);

    channel.bind("App\\Events\\NewDebugEvent", (data) => {
        debugEvents = [data, ...debugEvents];
    });
</script>

<svelte:head>
  <title>Debug - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="debug" appId={app.appId} appTitle={app.title}>
    <div class="max-w-7xl flex items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex grow">
            <div class="ml-auto">
                <Button label="Clear Events" endpoint="/apps/{app.appId}/debug/clear" />
            </div>
       </div>
    </div>

    <div class="max-w-7xl items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="bg-gray-50 rounded-t-lg">
        <div class="flex items-center font-semibold p-2">
            <div class="w-1/5">
                Event
            </div>
            <div class="w-1/3">
                Channel
            </div>
            <div class="w-1/3">
                User ID
            </div>
            <div class="w-1/5">
                Timestamp
            </div>
        </div>
        </div>

        {#if debugEvents.length != 0}
        {#each debugEvents as debugEvent, i}
        <div class="py-2">
            <DebugEvent {debugEvent} bind:selectedEventMessage {i} />
        </div>
        {/each}
        {:else}
        <div class="py-3">
            <div class="flex items-center p-2 text-center">
                <div class="animate-spin text-black h-4 w-4 mr-2">
                    <FaSpinner />
                </div>
                Waiting for events...
            </div>
        </div>
        {/if}
    </div>
</Dashboard>
