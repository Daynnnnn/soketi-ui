<script>
    import Text from "../Components/Inputs/Text.svelte"
    import Select from 'svelte-select';
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../Icons/Lambda.svelte'

    export let webhook;

    const fieldMap = {
        lambda: {
            title: "Lambda Function ARN",
            key: 'lambda_function',
            icon: LambdaIcon,
        },
        url: {
            title: "Webhook URL",
            key: 'url',
            icon: HookIcon,
        },
    };

    const awsRegions = [
        {value: 'eu-west-1', label: 'eu-west-1'},
        {value: 'eu-west-2', label: 'eu-west-2'},
    ];

    const events = [
        {value: 'client_event', label: 'Client Event'},
        {value: 'channel_occupied', label: 'Channel Occupied'},
        {value: 'channel_vacated', label: 'Channel Vacated'},
        {value: 'member_added', label: 'Member Added'},
        {value: 'member_removed', label: 'Member Removed'},
    ];

    function handleEventsSelect(event) {
        webhook.events = [];
        if (event.detail != null) event.detail.forEach(event => webhook.events.push(event.value));
    }

    function handleRegionSelect(event) {
        webhook.region = event.detail.value;
    }

    function getEvents() {
        return events.filter(event => webhook.events.includes(event.value));
    }

    let type = (typeof webhook.url != 'undefined') ? 'url' : 'lambda';
</script>

<div class="w-full relative rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm items-center space-y-2 divide-y-2 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="flex items-center space-x-2">
    <div class="h-12 pr-2 flex items-center border-r-2 border-gray-200">
        <svelte:component this={fieldMap[type]['icon']}/>
    </div>
    <div class="grow">
        <h1 class="font-semibold pl-1">
            {fieldMap[type]['title']}
        </h1>
        <div class="w-full">
            <Text bind:input={webhook[fieldMap[type]['key']]} />
        </div>
    </div>
    </div>
    <div class="w-full flex space-x-2 pt-2">
    <div class="{type == 'lambda' ? 'w-3/4' : 'w-full'}">
        <h1 class="font-semibold">Events</h1>
        <Select on:select={handleEventsSelect} isMulti={true} items={events} value={getEvents()}></Select>
    </div>
    {#if type == 'lambda'}
    <div class="w-1/4">
        <h1 class="font-semibold">AWS Region</h1>
        <Select on:select={handleRegionSelect} items={awsRegions} value={webhook.region}></Select>
    </div>
    {/if}
    </div>
</div>