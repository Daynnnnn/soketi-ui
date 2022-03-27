<script>
    import { Inertia } from '@inertiajs/inertia'
    import Pusher from 'pusher-js';

    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import DebugEvent from "../../../Components/Cards/DebugEventCard.svelte"
    import SelectedDebugEventMessage from "../../../Components/Cards/SelectedDebugEventMessageCard.svelte"

    export let app;

    let debugEvents = [];
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

    $: console.log(debugEvents)
</script>

<svelte:head>
  <title>Debug - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="debug" appId={app.appId} appTitle={app.title}>
    <div class="max-w-7xl items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex space-x-4">
            <div class="grid grid-cols-1 gap-4 {selectedEventMessage !== false ? "w-1/4" : "w-full"}">
                {#each debugEvents as debugEvent, i}
                <DebugEvent {debugEvent} bind:selectedEventMessage {i} />
                {/each}
            </div>
            {#if selectedEventMessage !== false}
            <div class="grow">
                <SelectedDebugEventMessage bind:selectedEventMessage {debugEvents} />
            </div>
            {/if}
        </div>
    </div>
</Dashboard>
