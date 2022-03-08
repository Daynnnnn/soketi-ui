<script>
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import Button from "../../../Components/Inputs/Button.svelte"
    import AddButton from "../../../Components/Inputs/AddButton.svelte"
    import WebhookCard from "../../../Components/Cards/WebhookCard.svelte"

    export let app;

    $: app.webhooks = app.webhooks.filter((webhook) => webhook !== null);
</script>

<svelte:head>
  <title>Webhooks - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="webhooks" appId={app.appId}>
    <div class="max-w-7xl flex items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex items-center ">
            <div on:click={() => app.webhooks = [...app.webhooks, {}]} class="pr-1">
                <AddButton />
            </div>
            <h1 class="text-2xl font-semibold text-gray-900">{app.title}</h1>
        </div>
        <div class="flex grow">
            <div class="ml-auto">
                <Button label="Save" endpoint="/apps/{app.appId}/save" data="{app}" />
            </div>
       </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid lg:grid-cols-1 gap-4">
            {#each app.webhooks as _, i}
                <WebhookCard bind:webhook={app.webhooks[i]} />
            {/each}
        </div>
    </div>
</Dashboard>
