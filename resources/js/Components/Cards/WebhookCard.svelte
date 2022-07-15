<script>
    import { createEventDispatcher } from 'svelte';
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../../Icons/Lambda.svelte'
    import Select from 'svelte-select';
    import IoMdSave from 'svelte-icons/io/IoMdSave.svelte'
    import TiPencil from 'svelte-icons/ti/TiPencil.svelte'
    import MdDelete from 'svelte-icons/md/MdDelete.svelte'

    export let webhook;
    export let index;

    const dispatch = createEventDispatcher();

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

    let editMode = false;
    let type = (typeof webhook.lambda_function != 'undefined') ? 'lambda' : 'url';

    function toggleEditMode() {
        editMode = !editMode;

        if (editMode === false) {
            dispatch('message', {webhook: webhook, index: index});
        }
    }

    function deleteWebhook() {
        webhook = null;
        dispatch('message', {webhook: webhook, index: index});
    }

    function addHeader() {
        webhook['headers']['X-Header'] = null;
    }

    function headerNameChange(event, i) {
        let headerName = event.target.value;
        let headerValue = webhook['headers'][i];

        let headers = webhook['headers'];
        delete headers[i];
        headers[headerName] = headerValue;

        webhook['headers'] = headers;
    }

    function handleEventsSelect(event) {
        webhook.event_types = [];
        if (event.detail != null) event.detail.forEach(event => webhook.event_types.push(event.value));
    }

    function getEvents() {
        if (webhook.event_types == null) return;
        return events.filter(event => webhook.event_types.includes(event.value));
    }

    if (webhook.lambda_function === '' || webhook.url === '') {
        editMode = true;
    }
</script>

{#if webhook != null}
<div class="w-full flex rounded-lg border transition duration-200 border-gray-300 hover:border-gray-400 shadow-sm  focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
<div class="w-full rounded-lg bg-white px-6 py-3 items-center space-y-2 transition duration-200 hover:bg-gray-50">
    <dl class="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
    <div>
        <dt class="text-md font-medium text-gray-500">{fieldMap[type]['title']}</dt>
        {#if editMode}
        <input bind:value={webhook[fieldMap[type]['key']]} class="w-full mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
        {:else}
        <dd class="mt-1 text-md text-gray-900">{webhook[fieldMap[type]['key']]}</dd>
        {/if}
    </div>
    <div>
        <dt class="font-medium text-gray-500">Filters</dt>
        <dd class="mt-1 text-gray-900">
            {#if editMode}
            <div class="flex items-center">
                <p class="mr-2">Channel Name Starts: </p>
                <input bind:value={webhook['filters']['channel_name_starts_with']} class="mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
            </div>
            {:else if webhook['filters']['channel_name_starts_with']}
            <p>Channel Name Starts: {webhook['filters']['channel_name_starts_with'] ?? ''}</p>
            {/if}
            {#if editMode}
            <div class="flex items-center">
                <p class="mr-2">Channel Name Ends: </p>
                <input bind:value={webhook['filters']['channel_name_ends_with']} class="mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
            </div>
            {:else if webhook['filters']['channel_name_ends_with']}
            <p>Channel Name Ends: {webhook['filters']['channel_name_ends_with'] ?? ''}</p>
            {/if}
        </dd>
    </div>
    <div>
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
    <div>
        <div class="flex items-center">
            {#if editMode}
            <button on:click={addHeader} type="button" class="mr-1 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg class="h-2 w-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
            {/if}
            <dt class="font-medium text-gray-500">Headers</dt>
        </div>
        <dd class="mt-1 text-gray-900">
            {#if webhook['headers']}
                {#each Object.keys(webhook['headers']) as i}
                {#if editMode}
                <div>
                    <input on:change={(event) => headerNameChange(event, i)} value={i} class="mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
                    :
                    <input bind:value={webhook['headers'][i]} class="ml-1 mt-1 px-2 py-1 text-md text-gray-900 border border-gray-300 rounded-sm" />
                </div>
                {:else}
                <p>{i}: {webhook['headers'][i]}</p>
                {/if}
                {/each}
            {:else}
                No Headers
            {/if}
        </dd>
    </div>
    </dl>
</div>
<div class="flex w-24 rounded-r-md h-full items-center cursor-pointer ">
        {#if editMode}
        <div on:click={toggleEditMode} class="w-full h-full flex bg-gray-700">
            <div class="text-white m-auto inline-block align-middle w-8">
                <IoMdSave />
            </div>
        </div>
        {:else}
        <div on:click={toggleEditMode} class="w-1/2 h-full flex bg-gray-700">
            <div class="text-white m-auto inline-block align-middle w-8">
                <TiPencil />
            </div>
        </div>
        <div on:click={deleteWebhook} class="w-1/2 h-full flex bg-red-500 rounded-r-lg">
            <div class="text-white m-auto block w-8">
                <MdDelete />
            </div>
        </div>
        {/if}
</div>
</div>
{/if}