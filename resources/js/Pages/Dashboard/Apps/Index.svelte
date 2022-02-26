<script>
    import AppCard from "../../../Components/AppCard.svelte"
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"

    let apps = [
        {id: '1', title: "Kwizzbit - QA", enabled: true, client_events: true, max_connections: 2000, webhook_count: 2},
        {id: '2', title: "Kwizzbit - Production", enabled: true, client_events: false, max_connections: 100000, webhook_count: 1}
    ];

</script>

<Dashboard id="apps">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <h1 class="text-2xl font-semibold text-gray-900">Apps</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="space-y-4">
            {#each apps as app}
                <AppCard {app} />
            {/each}
        </div>
    </div>
</Dashboard>