<script>
    import { Inertia } from '@inertiajs/inertia';
    import FaCheck from 'svelte-icons/fa/FaCheck.svelte'
    import FaSpinner from 'svelte-icons/fa/FaSpinner.svelte'

    export let label;
    export let data;
    export let endpoint;

    let status = 'inactive';

    function onClick() {
        status = 'inprogress';
        Inertia.post(endpoint, data, {
            preserveScroll: true,
            onSuccess: () => {
                status = 'complete';
                setTimeout(() => {
                    status = 'inactive';
                }, 1000);
            },
        });
    }
</script>

<button on:click={typeof endpoint !== 'undefined' ? onClick : null} type="button" class="ml-5 z-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    {label}
    <div>
        <div class="{status != 'inprogress' ? "hidden" : ""} animate-spin text-white h-6 w-6 ml-2">
            <FaSpinner />
        </div>
        <div class="{status != 'complete' ? "hidden" : ""} text-white h-6 w-6 ml-2">
            <FaCheck />
        </div>
    </div>
</button>
