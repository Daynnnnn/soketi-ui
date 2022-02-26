<script>
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import TextWithToggle from "../../../Components/Inputs/TextWithToggle.svelte"
    import WebhookCard from "../../../Components/WebhookCard.svelte"

    let app = {
        id: 'ftyvbn9h7g',
        title: "Kwizzbit - QA",
        credentials: {
            key: 'nbvcdf678ghionkljxdr78gi',
            secret: 'fnsdbcf7689hoinfsduv8h7b'
        },
        enabled: true,
        client_events: true,
        max_connections: 2000, 
        webhooks: [
            {type: "lambda", target: "arn:aws:lambda:us-east-2:123456789012:function:my-function:1"},
            {type: "url", target: "https://webhook.site/abc"}
        ],
    };

    let enabled;
    let max_connections;
    let enable_client_messages;
    let max_backend_events;
    let max_client_events;
    let max_read_requests;

    function regenerateCredentials() {
        console.log('bosh')
    }
</script>

<Dashboard id="apps">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <h1 class="text-2xl font-semibold text-gray-900">{app.title}</h1>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-2">
        <h2 class="text-lg font-semibold text-gray-900">Keys</h2>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="mx-auto rounded-lg bg-white shadow-lg w-full border border-gray-100">
            <div on:click={regenerateCredentials} class="cursor-pointer transition duration-200 text-center hover:bg-gray-50 active:bg-gray-100 border-b-2 border-gray-100 py-2">
                Regenerate Keys
            </div>
            <dl class="lg:grid lg:grid-cols-3">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center lg:border-0 lg:border-r">
                <dd class="order-1 text-2xl font-extrabold text-indigo-600">App ID</dd>
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.id}</dt>
            </div>
            <div class="flex flex-col border-t border-b border-gray-100 p-6 text-center lg:border-0 lg:border-l lg:border-r">
                <dd class="order-1 text-2xl font-extrabold text-indigo-600">App Key</dd>
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.credentials.key}</dt>
            </div>
            <div class="flex flex-col border-t border-gray-100 p-6 text-center lg:border-0 lg:border-l">
                <dd class="order-1 text-2xl font-extrabold text-indigo-600">App Secret</dd>
                <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">{app.credentials.secret}</dt>
            </div>
            </dl>
        </div>

        <div class="pt-8 pb-2">
            <h2 class="text-lg font-semibold text-gray-900">Webhooks</h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-2">
        {#each app.webhooks as webhook}
            <WebhookCard {webhook} />
        {/each}
        </div>

        <div class="mt-6 grid grid-cols-4 gap-2">
            <TextWithToggle label="Max Connections" placeholder="∞" bind:max_connections />
            <TextWithToggle label="Max Backend Events" placeholder="∞" bind:max_backend_events />
            <TextWithToggle label="Max Client Events" placeholder="∞" bind:max_client_events />
            <TextWithToggle label="Max Read Requests" placeholder="∞" bind:max_read_requests />
        </div>
        
    </div>
</Dashboard>