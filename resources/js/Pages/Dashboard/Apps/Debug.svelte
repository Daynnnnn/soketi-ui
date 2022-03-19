<script>
    import { Inertia } from '@inertiajs/inertia'

    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import DebugEvent from "../../../Components/Cards/DebugEventCard.svelte"
    import SelectedDebugEventMessage from "../../../Components/Cards/SelectedDebugEventMessageCard.svelte"

    export let app;
    export let debug_events;

    let selectedEventMessage = false;

    setInterval(() => {
        Inertia.reload({ only: ['debug_events']});
    }, 1000);
</script>

<svelte:head>
  <title>Debug - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="debug" appId={app.appId} appTitle={app.title}>
    <div class="max-w-7xl items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex space-x-4">
            <div class="grid grid-cols-1 gap-4 {selectedEventMessage !== false ? "w-1/4" : "w-full"}">
                {#each debug_events as debug_event, i}
                <DebugEvent {debug_event} bind:selectedEventMessage {i} />
                {/each}
            </div>
            {#if selectedEventMessage !== false}
            <div class="grow">
                <SelectedDebugEventMessage bind:selectedEventMessage {debug_events} />
            </div>
            {/if}
        </div>
    </div>
</Dashboard>
