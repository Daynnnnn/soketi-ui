<script>
    import { Inertia } from '@inertiajs/inertia';

    export let label;
    export let data;
    export let endpoint;

    function onClick() {
        Inertia.post(endpoint, data);
    }
</script>

<button on:click={onClick} type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{label}</button>
