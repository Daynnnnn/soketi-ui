<script>
  import { Inertia } from '@inertiajs/inertia'

  let values = {
    email: null,
    password: null,
    remember: null,
  }

  let errorMessage = false;
  let isShaking = false;

  function handleSubmit() {
    Inertia.post('/login', values, {
      onError: (error) => handleError(error),
    })
  }

  function handleError(error) {
    errorMessage = error;
    isShaking = true;
    setTimeout(() => isShaking = false, 450);
  }
</script>

<div class="{isShaking ? 'animate-wiggle ' : ''}h-screen flex flex-col justify-center mx-auto py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md ">
    <div class="h-24 w-24 mx-auto">
      <img alt="Soketi Logo" src="/logo.png" />
    </div>
    <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">Soketi UI</h2>
  </div>

  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">

    {#if errorMessage}
      <div id="error-message" class="bg-red-50 text-red-400 text-center py-4 px-2 shadow sm:rounded-lg sm:px-10">
          {errorMessage.message}
      </div>
    {/if}

    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form on:submit|preventDefault={handleSubmit} class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
          <div class="mt-1">
            <input bind:value={values.email} id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="mt-1">
            <input bind:value={values.password} id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div>

          <div class="text-sm">
            <a href="/forgotten-password" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div>
        </div>

        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</button>
        </div>
      </form>
    </div>
  </div>
</div>