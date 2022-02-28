<script>
    import AppsIcon from 'svelte-icons/io/IoIosApps.svelte'
    import MoreIcon from 'svelte-icons/md/MdMoreVert.svelte'
    import OverviewIcon from 'svelte-icons/go/GoTelescope.svelte'

    export let id;

    const navItems = [
        // {id: "overview", title: "Overview", path: "/overview", icon: OverviewIcon},
        {id: "apps", title: "Apps", path: "/apps", icon: AppsIcon},
    ];

    let dropdownMenu = false;
    let sidebarOpen = true;
</script>

<div>
    <div class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
      <div class="transition-opacity ease-linear duration-300 {sidebarOpen ? "opacity-100" : "opacity-0"} fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>
      <div class="transition ease-in-out duration-300 transform {sidebarOpen ?  "translate-x-0" : "-translate-x-full"} relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
        <div class="ease-in-out duration-300 {sidebarOpen ? "opacity-100" : "opacity-0"} absolute top-0 right-0 -mr-12 pt-2">
          <button on:click={() => sidebarOpen = !sidebarOpen} type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Close sidebar</span>
            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-shrink-0 flex items-center px-4">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg" alt="Workflow">
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2 space-y-1">
            {#each navItems as navItem}
            <a href="{navItem.path}" class="{id == navItem.id ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} group flex items-center px-2 py-2 text-base font-medium rounded-md">
                <div class="{id == navItem.id ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"} text-gray-500 mr-4 flex-shrink-0 h-6 w-6">
                    <svelte:component this={navItem.icon}/>
                </div>
                {navItem.title}
              </a>
            {/each}
          </nav>
        </div>
      </div>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
      </div>
    </div>
  
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
            <h1 class="text-2xl font-semibold">Soketi UI</h1>
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1">
            {#each navItems as navItem}
            <a href="{navItem.path}" class="{id == navItem.id ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"} group flex items-center px-2 py-2 text-sm font-medium rounded-md">
              <div class="{id == navItem.id ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500"} mr-3 flex-shrink-0 h-8 w-8" >
                <svelte:component this={navItem.icon}/>
              </div>
              {navItem.title}
            </a>
            {/each}
          </nav>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
          <span class="sr-only">Open sidebar</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex">
            <form class="w-full flex md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input id="search-field" class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm" placeholder="Search" type="search" name="search">
              </div>
            </form>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <div class="ml-3 relative">
              <div>
                <button on:click="{() => {dropdownMenu = !dropdownMenu}}" type="button" class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <div class="text-gray-500 flex-shrink-0 h-8 w-8">
                    <MoreIcon />
                  </div>
                </button>
              </div>

              <div class="{dropdownMenu ? "" : "hidden"} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <!-- Active: "bg-gray-100", Not Active: "" -->
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
  
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
  
                <a href="/logout" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <div class="py-6">
            <slot />
        </div>
      </main>
    </div>
  </div>