import { createInertiaApp } from '@inertiajs/inertia-svelte'

createInertiaApp({
  resolve: name => require(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})