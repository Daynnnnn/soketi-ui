<script>
    import { fly } from 'svelte/transition';

    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import Button from "../../../Components/Inputs/Button.svelte"
    import WebhookCard from "../../../Components/Cards/WebhookCard.svelte"
    import WebhookModal from "../../../Components/Inputs/WebhookModal.svelte"

    export let app;

    let modalOpen = false;
    let activeWebhook = false;
    let defaultWebhook = {
        url: '',
        events: [],
    };

    function addWebhook() {
        app.webhooks = [...app.webhooks, defaultWebhook];
        activeWebhook = app.webhooks.length - 1;
        modalOpen = true;
    }

    $: app.webhooks = app.webhooks.filter((webhook) => webhook !== null);
</script>

<svelte:head>
  <title>Webhooks - {app.title} | Soketi UI</title>
</svelte:head>

{#if activeWebhook !== false}
<WebhookModal bind:modalOpen bind:webhook={app.webhooks[activeWebhook]} />
{/if}

<Dashboard items="apps" page="webhooks" appId={app.appId} appTitle={app.title}>
    <div class="max-w-7xl flex items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex grow">
            <div on:click={addWebhook} class="ml-auto">
                <Button label="Add" />
            </div>
            <div>
                <Button label="Save" endpoint="/apps/{app.appId}/save" data="{app}" />
            </div>
       </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-4">
            {#each app.webhooks as _, i}
                <div in:fly="{{ x: -200, duration: 500 }}" >
                    <WebhookCard bind:modalOpen bind:activeWebhook={activeWebhook} bind:webhooks={app.webhooks} webhook={i} />
                </div>
            {/each}
        </div>
    </div>
</Dashboard>
