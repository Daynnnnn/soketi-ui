<script>
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import Button from "../../../Components/Inputs/Button.svelte"
    import WebhookCard from "../../../Components/WebhookCard.svelte"

    export let app;
</script>

<Dashboard items="apps" page="webhooks" appId={app.appId}>
    <div class="max-w-7xl flex items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div>
            <h1 class="text-2xl font-semibold text-gray-900">{app.title}</h1>
        </div>
        <div class="flex grow">
            <div class="ml-auto">
                <Button label="Save" endpoint="/apps/{app.appId}/save" data="{app}" />
            </div>
       </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid lg:grid-cols-1 gap-2">
            {#each app.webhooks as webhook}
                <WebhookCard {webhook} />
            {/each}
        </div>
    </div>
</Dashboard>
