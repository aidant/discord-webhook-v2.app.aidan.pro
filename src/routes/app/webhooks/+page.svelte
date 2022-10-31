<script lang="ts">
  import { listWebhooks, type Webhook } from '$lib/database'
  import { onMount } from 'svelte'
  import WebhookPreview from './webhook-preview.svelte'

  $: webhooksPromise = new Promise<Webhook[]>(() => {})

  onMount(() => {
    webhooksPromise = listWebhooks()
  })
</script>

{#await webhooksPromise then webhooks}
  <ul>
    {#each webhooks as webhook (webhook.webhookId)}
      <li>
        <WebhookPreview {webhook} />
      </li>
    {/each}
  </ul>
{/await}
