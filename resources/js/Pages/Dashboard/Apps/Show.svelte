<script>
    import { Inertia } from '@inertiajs/inertia'

    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import AddButton from "../../../Components/Inputs/AddButton.svelte"
    import Button from "../../../Components/Inputs/Button.svelte"
    import TextWithToggle from "../../../Components/Inputs/TextWithToggle.svelte"
    import Toggle from "../../../Components/Inputs/Toggle.svelte"
    import WebhookCard from "../../../Components/WebhookCard.svelte"

    export let app;

    $: console.log(app)

    function regenerateCredentials() {
        Inertia.post('/apps/' + app.appId + '/regenerate-credentials');
    }
</script>

<Dashboard id="apps">
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
        <div class="flex space-x-4">
            <div class="w-2/3 grid grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-y-16">
                <div>
                    <p class="text-lg font-semibold">App Enabled</p>
                    <div class="rounded-lg border bg-gray-50 border-gray-100">
                        <div class="text-center py-4">
                            <Toggle bind:active={app.enabled} />
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-lg font-semibold">Client Events</p>
                    <div class="rounded-lg border bg-gray-50 border-gray-100">
                        <div class="text-center py-4">
                            <Toggle bind:active={app.enableClientMessages} />
                        </div>
                    </div>
                </div>
                <TextWithToggle label="Max Connections" defaultValue="0" placeholder="∞" bind:input={app.maxConnections} />
                <TextWithToggle label="Max Backend Events / Second" defaultValue="0" placeholder="∞" bind:input={app.maxBackendEventsPerSecond} />
                <TextWithToggle label="Max Client Events / Second" defaultValue="0" placeholder="∞" bind:input={app.maxClientEventsPerSecond} />
                <TextWithToggle label="Max Read Requests / Second" defaultValue="0" placeholder="∞" bind:input={app.maxReadRequestsPerSecond} />
            </div>
            <div class="grow mx-auto rounded-lg bg-white shadow-lg border border-gray-100">
                <div on:click={regenerateCredentials} class="h-1/10 cursor-pointer transition duration-200 text-center hover:bg-gray-50 active:bg-gray-100 border-b-2 border-gray-100 py-2">
                    <div class="my-auto">
                        Regenerate Keys
                    </div>
                </div>
                <div class="h-9/10">
                <div class="h-1/3 flex flex-col border-b border-gray-100 p-6 text-center">
                    <dd class="order-1 text-2xl font-extrabold text-indigo-600">App ID</dd>
                    <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.appId}</dt>
                </div>
                <div class="h-1/3 flex flex-col border-t border-b border-gray-100 p-6 text-center">
                    <dd class="order-1 text-2xl font-extrabold text-indigo-600">App Key</dd>
                    <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.appKey}</dt>
                </div>
                <div class="h-1/3 flex flex-col border-t border-gray-100 p-6 text-center">
                    <dd class="order-1 text-2xl font-extrabold text-indigo-600">App Secret</dd>
                    <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.appSecret}</dt>
                </div>
                </div>
            </div>
        </div>

        <div class="flex items-center pt-8 pb-2">
            <div class="pr-1">
                <AddButton />
            </div>
            <h2 class="text-lg font-semibold text-gray-900">Webhooks</h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-2">
        {#each app.webhooks as webhook}
            <WebhookCard {webhook} />
        {/each}
        </div>
        
    </div>
</Dashboard>