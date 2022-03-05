<script>
    import { Inertia } from '@inertiajs/inertia';
    import FaCheck from 'svelte-icons/fa/FaCheck.svelte'

    export let label;
    export let data;
    export let endpoint;

    let active = false;

    function onClick() {
        Inertia.post(endpoint, data);
        active = true;
        setTimeout(() => {
            active = false;
        }, 1000);
    }
</script>

<div class="flex items-center">
    <button on:click={onClick} type="button" class="z-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{label}</button>
    <div class="transition duration-200 z-0 h-full bg-indigo-400 rounded-r-md shadow-sm px-4 py-2 {active ? "-translate-x-1" : "-translate-x-16"}">
        <div class="text-white h-6 w-6">
            <FaCheck />
        </div>
    </div>
</div>
