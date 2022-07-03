<script>
    import Button from "../Inputs/Button.svelte"
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../../Icons/Lambda.svelte'
    import Select from 'svelte-select';

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

    const events = [
        {value: 'client_event', label: 'Client Event'},
        {value: 'channel_occupied', label: 'Channel Occupied'},
        {value: 'channel_vacated', label: 'Channel Vacated'},
        {value: 'member_added', label: 'Member Added'},
        {value: 'member_removed', label: 'Member Removed'},
    ];

    let editMode = true;
    let type = (typeof webhook.lambda_function != 'undefined') ? 'lambda' : 'url';

    function handleEventsSelect(event) {
        webhook.event_types = [];
        if (event.detail != null) event.detail.forEach(event => webhook.event_types.push(event.value));
    }

    function getEvents() {
        if (webhook.event_types == null) return;
        return events.filter(event => webhook.event_types.includes(event.value));
    }
</script>

<div class="w-full relative rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm items-center space-y-2 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <dl class="grid grid-cols-4 gap-x-4 gap-y-4">
    <div class="sm:col-span-2">
        <dt class="text-md font-medium text-gray-500">{fieldMap[type]['title']}</dt>
        {#if editMode}
        <input bind:value={webhook[fieldMap[type]['key']]} class="w-full mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
        {:else}
        <dd class="mt-1 text-md text-gray-900">{webhook[fieldMap[type]['key']]}</dd>
        {/if}
    </div>
    <div class="sm:col-span-2">
        <dt class="font-medium text-gray-500">Filters</dt>
        <dd class="mt-1 text-gray-900">
            {#if webhook['filters']['channel_name_starts_with']}
                <p>Channel Name Starts: {webhook['filters']['channel_name_starts_with'] ?? ''}</p>
            {/if}
            {#if webhook['filters']['channel_name_end_with']}
                <p>Channel Name Ends: {webhook['filters']['channel_name_end_with'] ?? ''}</p>
            {/if}
        </dd>
    </div>
    <div class="sm:col-span-2">
        <dt class="font-medium text-gray-500">Events</dt>
        <dd class="mt-1 text-gray-900">
        {#if editMode}
        <Select on:select={handleEventsSelect} isMulti={true} items={events} value={getEvents()}></Select>
        {:else}
        <!-- TODO: This is horrible -->
        {#each webhook['event_types'] ?? [] as event}
            {#each events as friendlyEvent}
            {#if friendlyEvent['value'] === event}
            <p>- {friendlyEvent['label']}</p>
            {/if}
            {/each}
        {/each}
        {/if}
        </dd>
    </div>
    <div class="sm:col-span-2">
        <dt class="font-medium text-gray-500">Headers</dt>
        <dd class="mt-1 text-gray-900">
            {#if webhook['headers']}
                {#each Object.keys(webhook['headers']) as i}
                <p>{i}: {webhook['headers'][i]}</p>
                {/each}
            {:else}
                No Headers
            {/if}
        </dd>
    </div>
    </dl>
</div>
