<script>
    import Dashboard from "../../../../Components/Layouts/Dashboard.svelte"
    import WebhookCard from "../../../../Components/Cards/WebhookCard.svelte"
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'

    export let app;

    const newWebhook = () => {
        app.webhooks.push({})
    }
</script>

<svelte:head>
  <title>Webhooks - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="webhooks" appId={app.appId} appTitle={app.title}>
    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid gap-4">
            {#each app.webhooks as webhook}
                <WebhookCard appId={app.id} {webhook} />
            {/each}
            <button on:click={newWebhook}>
                <div class="w-full relative rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm items-center space-y-2 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <div class="w-full inline-block align-middle text-gray-400 h-8">
                        <FaPlus />                        
                    </div>
                </div>
            </button>
        </div>
    </div>
</Dashboard>
