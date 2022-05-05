<script>
    import Dot from 'svelte-icons/go/GoPrimitiveDot.svelte'
    import Dropdown from 'svelte-icons/go/GoChevronDown.svelte'

    export let app;
    let isActive = false;
</script>

<a href="/apps/{app.id}" class="cursor-pointer w-full relative rounded-lg border border-gray-300 px-6 py-5 shadow-sm flex items-center space-x-3 transition duration-200 hover:bg-gray-50 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="w-1/3 flex items-center">
        <div class="{app.enabled ? "text-green-400" : "text-red-400"} w-8 h-8 mr-4">
            <Dot />
        </div>
      <p class="text-xl font-semibold">{app.title}</p>
    </div>
    <div class="flex items-center w-2/3 text-center divide-x">
        <div class="w-1/3">
            <h1 class="font-bold">Client Events</h1>
            <div class="{app.enable_client_messages ? "text-green-400" : "text-red-400"} mx-auto w-8 h-8">
                <Dot />
            </div>
        </div>
        <div class="w-1/3">
            <h1 class="font-bold">Max Connections</h1>
            <p>{app.max_connections == -1 ? "∞" : app.max_connections}</p>
        </div>
        <div class="w-1/3">
            <h1 class="font-bold">Webhooks</h1>
            <p>{app.webhook_count}</p>
        </div>
    </div>
    <div class="transition duration-300 h-8 -rotate-90">
        <Dropdown />
    </div>
</a>