<script>
    import HookIcon from 'svelte-icons/gi/GiMeatHook.svelte'
    import LambdaIcon from '../Icons/Lambda.svelte'

    export let webhook;

    let type = (typeof webhook.url != 'undefined') ? 'url' : 'lambda';

    let fieldMap = {
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
</script>

<div class="w-full relative rounded-lg border border-gray-300 bg-white  px-6 py-5 shadow-sm flex items-center space-x-3 transition duration-200 hover:border-gray-400 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
    <div class="h-12 pr-3 flex items-center border-r-2 border-gray-200">
        <svelte:component this={fieldMap[type]['icon']}/>
    </div>
    <div class="grow">
        <h1 class="font-semibold">
            {fieldMap[type]['title']}
        </h1>
        {webhook[fieldMap[type]['key']]}
    </div>
</div>