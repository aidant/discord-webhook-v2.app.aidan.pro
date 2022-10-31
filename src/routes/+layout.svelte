<script lang="ts">
  import { handleAuthorizationCodeCallback } from '@lazy/oauth2-authorization-code-pkce-client'
  import { onMount } from 'svelte'
  import '../app.css'
  import type { LayoutData } from './$types'

  export let data: LayoutData

  onMount(async () => {
    handleAuthorizationCodeCallback()
  })
</script>

<nav>
  <ul class="flex flex-row justify-center gap-4 py-4">
    {#each data.sections as section}
      <li>
        <a href="/{section.slug}">{section.title}</a>
      </li>
    {/each}
  </ul>
</nav>

<slot />
