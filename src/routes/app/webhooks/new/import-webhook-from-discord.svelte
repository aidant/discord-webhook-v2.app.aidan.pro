<script lang="ts">
  import type { Webhook } from '$lib/database'
  import {
    DISCORD_CLIENT_ID,
    DISCORD_OAUTH2_AUTHORIZE_URL,
    DISCORD_OAUTH2_SERVER_URL,
    DISCORD_OAUTH2_TOKEN_URL,
  } from '$lib/environment'
  import '@lazy/oauth2-authorization-code-pkce-client/register-web-component.js'
  import type { RESTPostOAuth2AccessTokenWithBotAndWebhookIncomingScopeResult } from 'discord-api-types/v10'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher<{ webhook: Webhook }>()

  const handleCredentials = async (event: CustomEvent) => {
    dispatch('webhook', { webhookId: event.detail.webhook.id, webhookToken: event.detail.webhook.token! })
  }

</script>
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore avoid-is -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    is="lazy-oauth2-authorization-code-pkce-client2"
    class="rounded-lg my-4 mx-auto text-center inline-block font-medium underline decoration-rose-500 decoration-2 underline-offset-1 hover:decoration-4 hover:underline-offset-0 after:content-['_↗']"
    server:endpoint={DISCORD_OAUTH2_SERVER_URL}
    oauth2:client_id={DISCORD_CLIENT_ID}
    oauth2:scope="webhook.incoming"
    on:oauth2:credentials={handleCredentials}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      viewBox="0 0 24 24"
      class="block mx-auto w-12 h-12"
    >
      <path
        fill="currentColor"
        d="M10.46 19a4.59 4.59 0 0 1-6.37 1.15A4.62 4.62 0 0 1 3 13.75a4.58 4.58 0 0 1 3.58-1.98l.05 1.43c-.91.07-1.79.54-2.36 1.36-1 1.44-.69 3.38.68 4.35 1.38.96 3.31.59 4.31-.84.31-.45.49-.94.56-1.44v-1.01l5.58-.04.07-.11a1.89 1.89 0 0 1 2.58-.72 1.9 1.9 0 0 1 .68 2.6 1.9 1.9 0 0 1-2.59.71c-.41-.23-.7-.6-.83-1.02l-4.07.02a4.96 4.96 0 0 1-.78 1.94m7.28-7.14a4.57 4.57 0 0 1 4.02 5.07 4.59 4.59 0 0 1-5.14 3.96 4.63 4.63 0 0 1-3.43-2.21l1.24-.72a3.22 3.22 0 0 0 2.32 1.45c1.75.21 3.3-.98 3.51-2.65a3.1 3.1 0 0 0-2.76-3.41 3.39 3.39 0 0 0-1.53.18l-.85.44-2.58-4.77h-.22a1.9 1.9 0 0 1-1.85-1.95 1.9 1.9 0 0 1 1.98-1.81c1.05.06 1.88.91 1.85 1.95-.02.44-.19.84-.46 1.15l1.9 3.51c.62-.2 1.3-.27 2-.19M8.25 9.14c-1-2.35.06-5.04 2.37-6.02a4.6 4.6 0 0 1 6 2.48 4.6 4.6 0 0 1-.2 4.07l-1.24-.72c.42-.81.49-1.8.09-2.73a3.12 3.12 0 0 0-4.04-1.72 3.1 3.1 0 0 0-1.58 4.1 3.2 3.2 0 0 0 1.32 1.51l.39.21-3.07 4.99c.03.05.07.11.1.19.49.91.15 2.06-.77 2.55a1.9 1.9 0 0 1-2.56-.81 1.9 1.9 0 0 1 .77-2.57c.39-.21.82-.26 1.23-.17l2.31-3.77a4.41 4.41 0 0 1-1.12-1.59Z"
      />
    </svg>
    Create a new Webhook
  </a>
