<script>
    import { fade } from 'svelte/transition';

    import Button from "../Inputs/Button.svelte"
    import Text from "../Inputs/Text.svelte"
    import Select from 'svelte-select';
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../../Icons/Lambda.svelte'

    export let modalOpen;
    export let webhook;

    const toggleModalOpen = () => modalOpen = !modalOpen;

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

    const webhookTypes = [
        {value: 'url', label: 'URL'},
        {value: 'lambda', label: 'Lambda'},
    ];

    function handleEventsSelect(event) {
        webhook.events = [];
        if (event.detail != null) event.detail.forEach(event => webhook.events.push(event.value));
    }

    function handleWebhooksSelect(event) {
        type = event.detail.value;
    }

    function getEvents() {
        if (webhook.events == null) return;
        return events.filter(event => webhook.events.includes(event.value));
    }

    function getWebhookType() {
        return webhookTypes.filter(webhookType => webhookType.value === type)[0];
    }

    function cancel() {
        toggleModalOpen();
        webhook = null;
    }

    function submit() {
        modalOpen = toggleModalOpen();
    }

    let type = (typeof webhook.lambda_function != 'undefined') ? 'lambda' : 'url';
</script>

{#if modalOpen}
<div transition:fade="{{ duration: 200 }}" class="fixed z-20 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div on:click={cancel} class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div class="opacity-100 translate-y-0 sm:scale-100 relative inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
        <div class="bg-white p-4 rounded-lg ">
            <div class="flex items-center pb-2 w-full">
                <h1 class="text-xl font-semibold">Add/Edit Webhook</h1>
                <div class="ml-auto flex items-center">
                    <h1 class="font-semibold pr-2">Webhook Type:</h1>
                    <div class="w-32">
                        <Select on:select={handleWebhooksSelect} items={webhookTypes} value={getWebhookType()}></Select>
                    </div>
                </div>
                <div class="h-8 w-8 ml-2">
                    <svelte:component this={fieldMap[type]['icon']}/>
                </div>
            </div>
            <div class="w-full grid grid-cols-1 gap-2">
                <div>
                    <h1 class="font-semibold">{fieldMap[type]['title']}</h1>
                    <Text bind:input={webhook[fieldMap[type]['key']]} />
                </div>
                <div class="w-full flex space-x-2 pt-2">
                    <div class="w-full">
                        <h1 class="font-semibold">Events</h1>
                        <Select on:select={handleEventsSelect} isMulti={true} items={events} value={getEvents()}></Select>
                    </div>
                </div>
                <div class="w-full pt-4">
                    <div on:click={submit} class="ml-auto text-right">
                        <Button label="Submit" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</div>
{/if}