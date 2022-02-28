<script>
    let active = false;

    export let input;
    export let label;
    export let placeholder;

    if (input !== 0 && input !== null) active = true;

    function toggleActive() {
        active = !active;
        if (active == false) input = 0;
    }
</script>

<div class="text-left">
    <p class="text-lg font-semibold">{label}</p>
    <div class="flex items-center border rounded-lg">
        <div on:click={toggleActive} class="cursor-pointer p-4 border-r-2 border-gray-100">
            <button type="button" class="{active ? "bg-indigo-600" : "bg-gray-200"} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200" role="switch" aria-checked="false">
                <span class="sr-only">Use setting</span>
                <span aria-hidden="true" class="{active ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
            </button>
        </div>
        <div class="grow text-xl">
            {#if active}
            <input bind:value={input} id="input" class="appearance-none block w-full px-3 py-4 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" />
            {:else}
            <input value="{placeholder}" disabled class="appearance-none block w-full px-3 py-4 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg" />
            {/if}
        </div>
    </div>
</div>