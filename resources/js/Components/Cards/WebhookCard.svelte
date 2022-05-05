<script>
    import Button from "../Inputs/Button.svelte"
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../../Icons/Lambda.svelte'

    export let activeWebhook;
    export let modalOpen;
    export let webhook;
    export let webhooks;

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

    const eventStyles = {
        client_event: {
            name: 'Client Event',
            class: "border-2 border-blue-600",
        },
        channel_occupied: { 
            name: 'Channel Occupied',
            class: "border-2 border-blue-600",
        },
        channel_vacated: {
            name: 'Channel Vacated',
            class: "border-2 border-blue-600",
        },
        member_added: {
            name: 'Member Added',
            class: "border-2 border-blue-600",
        },
        member_removed: {
            name: 'Member Removed',
            class: "border-2 border-blue-600",
        },
    };

    const friendlyEvent = (event, key) => eventStyles[event][key];

    function editWebhook() {
        activeWebhook = webhook;
        modalOpen = true;
    }

    function deleteWebhook() {
        webhooks[webhook] = null;
    }

    let type = (typeof webhooks[webhook].lambda_function != 'undefined') ? 'lambda' : 'url';
</script>

{#if webhooks[webhook] !== null}
<div class="w-full relative rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm items-center space-y-2 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="flex w-full items-center space-x-2">
    <div class="w-full">
        <div class="flex items-center">
            <h1 class="font-semibold">
                {fieldMap[type]['title']}
            </h1>
        </div>
        <div class="w-full">
            {webhooks[webhook][fieldMap[type]['key']]}
        </div>
    </div>
    <div class="w-full flex">
        <div on:click={editWebhook} class="ml-auto">
            <Button label="Edit" />
        </div>
        <div on:click={deleteWebhook}>
            <Button label="Delete" />
        </div>
    </div>
    </div>
    <div class="w-full flex space-x-2 pt-2">
    <div class="{type == 'lambda' ? 'w-5/6' : 'w-full'}">
        <h1 class="font-semibold">Events</h1>
        <div class="flex divide-x-2 -ml-2">
        {#each Object.keys(eventStyles) as i}
            {#if webhooks[webhook]['event_types'].includes(i)}
            <p class="px-2">{friendlyEvent(i, 'name')}</p>
            {/if}
        {/each}
        </div>
    </div>
    </div>
</div>
{/if}
