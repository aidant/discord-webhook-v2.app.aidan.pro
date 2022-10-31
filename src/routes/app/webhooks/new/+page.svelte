<script lang="ts">
  import { goto } from '$app/navigation'
  import Dialog from './dialog.svelte'
  import ImportWebhook from './import-webhook.svelte'

  const handleClose = () => {
    goto('/app/webhooks')
  }
</script>

<Dialog on:close={handleClose}>
  <ImportWebhook on:close={handleClose} />
</Dialog>
