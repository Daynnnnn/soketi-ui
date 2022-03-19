<script>
    import Dashboard from "../../../Components/Layouts/Dashboard.svelte"
    import Button from "../../../Components/Inputs/Button.svelte"
    import TextWithToggle from "../../../Components/Inputs/TextWithToggle.svelte"
    import Toggle from "../../../Components/Inputs/Toggle.svelte"

    export let app;
</script>

<svelte:head>
  <title>Limits - {app.title} | Soketi UI</title>
</svelte:head>

<Dashboard items="apps" page="limits" appId={app.appId} appTitle={app.title}>
    <div class="max-w-7xl flex items-center mx-auto px-4 sm:px-6 md:px-8 pb-4">
        <div class="flex grow">
            <div class="ml-auto">
                <Button label="Save" endpoint="/apps/{app.appId}/save" data="{app}" />
            </div>
       </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex space-x-4">
            <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-4 lg:gap-y-16">
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
                <TextWithToggle label="Max Presence Members / Channel" defaultValue={null} placeholder="∞" bind:input={app.maxPresenceMembersPerChannel} />
                <TextWithToggle label="Max Presence Member Size (KB)" defaultValue={null} placeholder="∞" bind:input={app.maxPresenceMemberSize} />
                <TextWithToggle label="Max Channel Name Length" defaultValue={null} placeholder="∞" bind:input={app.maxChannelNameLength} />
                <TextWithToggle label="Max Simultaneous Event Channels" defaultValue={null} placeholder="∞" bind:input={app.maxSimultaneousEventChannels} />
                <TextWithToggle label="Max Event Name Length" defaultValue={null} placeholder="∞" bind:input={app.maxEventNameLength} />
                <TextWithToggle label="Max Event Payload Size (KB)" defaultValue={null} placeholder="∞" bind:input={app.maxEventPayloadSize} />
                <TextWithToggle label="Max Event Batch Size" defaultValue={null} placeholder="∞" bind:input={app.maxEventBatchSize} />
            </div>
        </div>
    </div>
</Dashboard>
