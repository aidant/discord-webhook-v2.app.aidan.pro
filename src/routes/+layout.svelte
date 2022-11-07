<script lang="ts">
  import '../app.css'
  import type { LayoutData } from './$types'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'

  export let data: LayoutData

  const setWidths = (words: { label: string, value: string }[]) => {
    const element = document.createElement('a')
    element.style.whiteSpace = 'pre'
    document.body.append(element)

    for (const word of words) {
      element.innerText = word.value
      const width = element.getBoundingClientRect().width
      document.documentElement.style.setProperty(`--width-${word.label}`, width.toString())
    }

    element.remove()
  }

  const handleMouseMove = (event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth - 0.5) / 0.5
    const y = (event.clientY / window.innerHeight - 0.5) / 0.5
    document.documentElement.style.setProperty('--motion-x', x.toString())
    document.documentElement.style.setProperty('--motion-y', y.toString())
  }

  const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
    if (!event.beta || !event.gamma) return
    const x = ((event.gamma / 90)) * 5
    const y = (((event.beta - 45)  / 90)) * 5
    document.documentElement.style.setProperty('--motion-x', x.toString())
    document.documentElement.style.setProperty('--motion-y', y.toString())
  }

  const removeMouseMove = () => window.removeEventListener('mousemove', handleMouseMove)

  onMount(() => {
    setWidths([
      { label: 'create', value: 'Create ' },
      { label: 'plus', value: ' +' },
      { label: 'messages', value: 'Messages' },
      { label: 'webhooks', value: 'Webhooks' },
      { label: 'profiles', value: 'Profiles' },
    ])

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('deviceorientation', handleDeviceOrientation)
    window.addEventListener('deviceorientation', removeMouseMove, { once: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', removeMouseMove)
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  })
</script>

<nav class="absolute bottom-10 left-0 right-0 mx-auto rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-xl max-w-md">
  <ul class="bg-white m-1 rounded-full flex flex-row justify-between gap-4 px-8 py-4 mix-blend-screen after:absolute after:block after:content-[''] after:whitespace-pre after:bottom-3 after:w-10 after:h-0.5 after:bg-black">
    {#each data.sections as section}
      {@const active = $page.url.pathname.startsWith(section.slug)}
      {@const create = $page.url.pathname === section.slug}
      <li>
        <a
          data-active={active}
          data-create={create}
          href="{create ? `${section.slug}/new` : section.slug}"
          class={`relative rounded-full focus:outline-black whitespace-nowrap motion-safe:transition-spacing motion-safe:duration-200 before:content-["Create_"] before:absolute before:left-0 motion-safe:before:transition-opacity motion-safe:before:duration-200 after:content-["_+"] after:absolute after:right-0 ${create ? 'before:opacity-1 after:opacity-1' : 'before:opacity-0 after:opacity-0'}`}
          aria-label={create ? `Create ${section.title}` : section.title}
        >{section.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<slot />

<style scoped>
  :global(:root) {
    --motion-x: 0;
    --motion-y: 0;
  }

  :global(body) {
    background-image:
      radial-gradient(rgb(229 231 235) 10%, transparent 10%),
      radial-gradient(rgb(229 231 235) 10%, transparent 10%);
    background-position:
      0 0,
      0.75rem 0.75rem;
    background-size: 1.5rem 1.5rem;
  }

  a[href$="/new"] {
    padding-left: calc(var(--width-create) * 1px);
    padding-right: calc(var(--width-plus) * 1px);
  }

  /*
    Set the underline position to be underneath the messages link when active
  */
  ul:has(li:nth-child(1) > a[data-active="true"][data-create="false"])::after {
    --width: calc(var(--width-messages) * 1px);
  }
  ul:has(li:nth-child(1) > a[data-active="true"])::after {
    --width: calc((var(--width-create) + var(--width-messages) + var(--width-plus)) * 1px);
    left: calc(2rem);
    width: var(--width);
  }

  /*
    Set the underline position to be underneath the webhooks link when active
  */
  ul:has(li:nth-child(2) > a[data-active="true"][data-create="false"])::after {
    --width: calc(var(--width-webhooks) * 1px);
  }
  ul:has(li:nth-child(2) > a[data-active="true"])::after {
    --width: calc((var(--width-create) + var(--width-webhooks) + var(--width-plus)) * 1px);
    --text: calc((var(--width-messages) * 1px) + var(--width) + (var(--width-profiles) * 1px));
    --space: calc((440px - 4rem - var(--text)) / 2);

    left: calc(2rem + (var(--width-messages) * 1px) + var(--space));
    width: var(--width);
  }

  /*
    Set the underline position to be underneath the profiles link when active
  */
  ul:has(li:nth-child(3) > a[data-active="true"])::after {
    --width: calc((var(--width-create) + var(--width-profiles) + var(--width-plus)) * 1px);
    left: calc(-2rem + 100% - var(--width));
    width: var(--width);
  }
  ul:has(li:nth-child(3) > a[data-active="true"][data-create="false"])::after {
    --width: calc(var(--width-profiles) * 1px);
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(body) {
      background-position:
        calc(var(--motion-x) * -0.0625rem) calc(var(--motion-y) * -0.0625rem),
        calc(var(--motion-x) * -0.0625rem + 0.75rem) calc(var(--motion-y) * -0.0625rem + 0.75rem);
    }

    nav, ul {
      transform: translate(calc(var(--motion-x) * 0.0625rem), calc(var(--motion-y) * 0.0625rem));
    }

    ul::after {
      transition: left 200ms ease, width 200ms ease;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    nav, ul {
      transform: translate(0, 0);
    }
  }
</style>
