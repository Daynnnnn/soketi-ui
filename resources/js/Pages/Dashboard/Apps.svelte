<script>
    import Dot from 'svelte-icons/go/GoPrimitiveDot.svelte'
    import Dashboard from "../../Components/Layouts/Dashboard.svelte"

    let apps = [
        {id: '1', title: "Kwizzbit - QA", enabled: true, max_connections: 1000},
        {id: '2', title: "Kwizzbit - Production", enabled: true, max_connections: 100000}
    ];

</script>

<Dashboard id="apps">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <h1 class="text-2xl font-semibold text-gray-900">Apps</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="grid grid-cols-1 gap-4">
            {#each apps as app}
            <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <div class="{app.enabled ? "text-green-400" : "text-red-400"} w-8 h-8 mr-4">
                  <Dot />
                </div>
                <div>
                  <p class="text-xl font-semibold">{app.title}</p>
                </div>
            </div>
            {/each}
        </div>
    </div>
</Dashboard>