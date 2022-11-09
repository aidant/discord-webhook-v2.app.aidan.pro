<script lang="ts">
  import '../app.css'
  import type { LayoutData } from './$types'
  import { page } from '$app/stores'
  import { motion } from '$lib/actions/motion'
  import { style } from '$lib/actions/style'
  import { text } from '$lib/actions/text'

  export let data: LayoutData
</script>

<svelte:window
  use:motion
  use:text={{
    create: 'Create ',
    plus: ' +',
    messages: 'Messages',
    webhooks: 'Webhooks',
    profiles: 'Profiles',
  }}
/>

<nav
  class="absolute bottom-4 left-4 right-4 z-20 mx-auto max-w-sm rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-xl transition-all duration-500 ease-out sm:bottom-10 sm:max-w-md"
>
  <ul
    use:style={{
      name: 'ul',
      styles: ['gap', 'padding-left', 'padding-right', 'width'],
      observe: ['resize'],
    }}
    class="m-0.5 flex flex-row justify-between gap-2 rounded-full bg-white px-4 py-2 mix-blend-screen transition-all duration-500 ease-out after:absolute after:bottom-2 after:block after:h-0.5 after:whitespace-pre after:bg-black after:transition-all after:duration-200 after:ease-['ease'] after:content-[''] dark:bg-black dark:mix-blend-darken after:dark:bg-white sm:m-1 sm:gap-4 sm:px-8 sm:py-3"
  >
    {#each data.sections as section}
      {@const active = $page.url.pathname.startsWith(section.slug)}
      {@const create = $page.url.pathname === section.slug}
      <li>
        <a
          data-active={active}
          data-create={create}
          href={create ? `${section.slug}/new` : section.slug}
          class={`text-black dark:text-white relative rounded-full focus:outline-black dark:focus:outline-white whitespace-nowrap motion-safe:transition-spacing motion-safe:duration-200 before:content-['Create_'] before:absolute before:left-0 motion-safe:before:transition-opacity motion-safe:before:duration-200 after:content-['_+'] after:absolute after:right-0 after:text-center ${
            create ? 'before:opacity-1 after:opacity-1' : 'before:opacity-0 after:opacity-0'
          }`}
          aria-label={create ? `Create ${section.title}` : section.title}>{section.title}</a
        >
      </li>
    {/each}
  </ul>
</nav>

<slot />

<style scoped>
  :global(html) {
    background-image: radial-gradient(rgb(229 229 229) 10%, transparent 10%),
      radial-gradient(rgb(229 229 229) 10%, transparent 10%);
    background-position: 0 0, 0.75rem 0.75rem;
    background-size: 1.5rem 1.5rem;
  }

  a[href$='/new'] {
    padding-left: calc(var(--text-width-create) * 1px);
    padding-right: calc(var(--text-width-plus) * 1px);
  }

  /*
    Set the underline position to be underneath the messages link when active
  */
  ul:has(li:nth-child(1) > a[data-active='true'][data-create='false'])::after {
    --width: calc(var(--text-width-messages) * 1px);
  }
  ul:has(li:nth-child(1) > a[data-active='true'])::after {
    --width: calc(var(--text-width-create) + var(--text-width-messages) + var(--text-width-plus));
    --text: calc(var(--width) + var(--text-width-webhooks) + var(--text-width-profiles));
    --space: max(
      calc(
        (
            var(--style-ul-width) - var(--style-ul-padding-left) - var(--style-ul-padding-right) -
              var(--text)
          ) / 2
      ),
      var(--style-ul-gap)
    );

    left: calc(var(--style-ul-padding-left) / var(--style-ul-width) * 100%);
    right: calc(
      (
          var(--style-ul-padding-right) + var(--text-width-profiles) + var(--space) +
            var(--text-width-webhooks) + var(--space)
        ) / var(--style-ul-width) * 100%
    );
    width: calc(var(--width) * 1px);
  }

  /*
    Set the underline position to be underneath the webhooks link when active
  */
  ul:has(li:nth-child(2) > a[data-active='true'][data-create='false'])::after {
    --width: var(--text-width-webhooks);
  }
  ul:has(li:nth-child(2) > a[data-active='true'])::after {
    --width: calc(var(--text-width-create) + var(--text-width-webhooks) + var(--text-width-plus));
    --text: calc(var(--text-width-messages) + var(--width) + var(--text-width-profiles));
    --space: max(
      calc(
        (
            var(--style-ul-width) - var(--style-ul-padding-left) - var(--style-ul-padding-right) -
              var(--text)
          ) / 2
      ),
      var(--style-ul-gap)
    );

    left: calc(
      (var(--style-ul-padding-left) + var(--text-width-messages) + var(--space)) /
        var(--style-ul-width) * 100%
    );
    right: calc(
      (var(--style-ul-padding-right) + var(--text-width-profiles) + var(--space)) /
        var(--style-ul-width) * 100%
    );
    width: calc(var(--width) * 1px);
  }

  /*
    Set the underline position to be underneath the profiles link when active
  */
  ul:has(li:nth-child(3) > a[data-active='true'][data-create='false'])::after {
    --width: var(--text-width-profiles);
  }
  ul:has(li:nth-child(3) > a[data-active='true'])::after {
    --width: calc(var(--text-width-create) + var(--text-width-profiles) + var(--text-width-plus));
    --text: calc(var(--text-width-messages) + var(--text-width-webhooks) + var(--width));
    --space: max(
      calc(
        (
            var(--style-ul-width) - var(--style-ul-padding-left) - var(--style-ul-padding-right) -
              var(--text)
          ) / 2
      ),
      var(--style-ul-gap)
    );

    left: calc(
      (
          var(--style-ul-padding-left) + var(--text-width-messages) + var(--space) +
            var(--text-width-webhooks) + var(--space)
        ) / var(--style-ul-width) * 100%
    );
    right: calc(var(--style-ul-padding-right) / var(--style-ul-width) * 100%);
    width: calc(var(--width) * 1px);
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(html) {
      background-position: calc(var(--motion-x) * -0.0625rem) calc(var(--motion-y) * -0.0625rem),
        calc(var(--motion-x) * -0.0625rem + 0.75rem) calc(var(--motion-y) * -0.0625rem + 0.75rem);
    }

    nav,
    ul {
      transform: translate(calc(var(--motion-x) * 0.0625rem), calc(var(--motion-y) * 0.0625rem));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    nav,
    ul {
      transform: translate(0, 0);
    }
  }

  @media (prefers-color-scheme: dark) {
    :global(html) {
      background-image: radial-gradient(rgb(38 38 38) 10%, transparent 10%),
        radial-gradient(rgb(38 38 38) 10%, transparent 10%);
    }
  }
</style>
