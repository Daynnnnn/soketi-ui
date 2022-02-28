<script>
    import AppCard from "../../../Components/AppCard.svelte"
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"

    export let apps;
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