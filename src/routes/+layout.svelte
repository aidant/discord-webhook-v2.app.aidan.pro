<script lang="ts">
  import '../app.css'
  import type { LayoutData } from './$types'
  import { page } from '$app/stores'

  export let data: LayoutData

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth - 0.5) / 0.5
    const y = (event.clientY / window.innerHeight - 0.5) / 0.5
    document.documentElement.style.setProperty('--mouse-x', x.toString())
    document.documentElement.style.setProperty('--mouse-y', y.toString())
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />

<nav class="absolute bottom-10 left-0 right-0 mx-auto rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-xl max-w-md">
  <ul class="bg-white m-1 rounded-full flex flex-row justify-evenly gap-4 py-4">
    {#each data.sections as section}
      {@const active = $page.url.pathname.startsWith(section.slug)}
      {@const exact = $page.url.pathname === section.slug}
      <li class="text-center">
        <a
          data-active={active}
          data-exact={exact}
          href="{exact ? `${section.slug}/new` : section.slug}"
          class={
            exact
              ? 'rounded-full whitespace-nowrap before:content-["Create_"] before:opacity-1 after:content-["_+"] after:opacity-1 underline decoration-2 underline-offset-8 decoration-transparent'
              : 'rounded-full whitespace-nowrap before:content-["Create_"] before:opacity-0 after:content-["_+"] after:opacity-0 underline decoration-2 underline-offset-8 decoration-transparent'
            }
        >{section.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<slot />

<style scoped>
    li:nth-child(1) > a[data-active="true"] {
      @apply decoration-indigo-500
    }
    li:nth-child(2) > a[data-active="true"] {
      @apply decoration-purple-500
    }
    li:nth-child(3) > a[data-active="true"] {
      @apply decoration-pink-500
    }

  @media (prefers-reduced-motion: no-preference) {
    nav, ul {
      transform: translate(calc(var(--mouse-x) * 0.0625rem), calc(var(--mouse-y) * 0.0625rem));
      transition: transform 0.125s ease;
    }

    a {
      transition: text-decoration-color 0.25s ease 0.125s;
    }

    a:not([data-exact="true"]) {
      transition: text-decoration-color 0s ease;
    }

    a:not([data-exact="true"])::before {
      pointer-events: none;
      margin-left: -3.27685546875rem;
    }

    a:not([data-exact="true"])::after {
      pointer-events: none;
      margin-right: -0.8720703125rem;
    }

    a::before, a::after {
      transition: opacity 0.25s ease, margin 0.25s ease;
    }

    a[data-exact="true"]::before, a[data-exact="true"]::after {
      transition: opacity 0.375s ease 0.125s, margin 0.25s ease;
    }
  }
</style>
