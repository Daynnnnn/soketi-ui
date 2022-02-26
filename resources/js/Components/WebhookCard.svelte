<script>
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../Icons/Lambda.svelte'

    export let webhook;

    let fieldMap = {
        lambda: {
            target: "Lambda Function ARN",
            icon: LambdaIcon,
        },
        url: {
            target: "Webhook URL",
            icon: HookIcon,
        },
    };
</script>

<div class="w-full relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="h-12 pr-3 flex items-center border-r-2 border-gray-200">
        <svelte:component this={fieldMap[webhook.type]['icon']}/>
    </div>
    <div class="grow">
        <h1 class="font-semibold">
            {fieldMap[webhook.type]['target']}
        </h1>
        {webhook.target}
    </div>
</div>