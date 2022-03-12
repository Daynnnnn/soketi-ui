<script>
    import { Inertia } from '@inertiajs/inertia'

    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import DebugEvent from "../../../Components/Cards/DebugEventCard.svelte"

    export let app;
    export let debug_events;

    setInterval(() => {
        Inertia.get("/apps/1353760/debug");
    }, 2000);
</script>

<svelte:head>
  <title>Debug - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="debug" appId={app.appId}>
    <div class="max-w-7xl items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div>
            <h1 class="text-2xl font-semibold text-gray-900">{app.title}</h1>
        </div>
        <div class="grid grid-cols-1 gap-4">
            {#each debug_events as debug_event}
            <DebugEvent {debug_event} />
            {/each}
        </div>
    </div>
</Dashboard>
