import type { DBSchema as Schema } from 'idb'

export interface Webhook {
  webhookId: string
  webhookToken: string
  webhookAvatar?: string
  webhookName?: string
}

export interface WebhookMessage {
  messageId: string
  webhookId: string
}

interface DiscordWebhookSchemaV1 extends Schema {
  webhooks: {
    key: string
    value: Webhook
  }
  'webhook-messages': {
    key: string
    value: WebhookMessage
    indexes: { 'by-webhook-id': string }
  }
}

let getDatabase = async () => {
  const { openDB: createDatabase } = await import('idb')

  const database = await createDatabase<DiscordWebhookSchemaV1>('discord-webhook', 1, {
    upgrade(db, oldVersion, newVersion) {
      if (!oldVersion) {
        const webhooksStore = db.createObjectStore('webhooks', { keyPath: 'webhookId' })
        const webhookMessagesStore = db.createObjectStore('webhook-messages', {
          keyPath: 'messageId',
        })
        webhookMessagesStore.createIndex('by-webhook-id', 'webhookId')
      }
    },
  })

  getDatabase = async () => database

  return database
}

export const createWebhook = async (webhook: Webhook): Promise<void> => {
  const database = await getDatabase()
  await database.put('webhooks', webhook)
}

export const getWebhook = async (webhookId: string): Promise<Webhook | undefined> => {
  const database = await getDatabase()
  return database.get('webhooks', webhookId)
}

export const listWebhooks = async (): Promise<Webhook[]> => {
  const database = await getDatabase()
  return database.getAll('webhooks')
}

export const deleteWebhook = async (webhookId: string): Promise<void> => {
  const database = await getDatabase()
  await database.delete('webhooks', webhookId)
}

export const createWebhookMessage = async (webhookId: string, messageId: string): Promise<void> => {
  const database = await getDatabase()
  await database.put('webhook-messages', { messageId, webhookId })
}

export const listWebhookMessages = async (webhookId: string): Promise<WebhookMessage[]> => {
  const database = await getDatabase()
  return database.getAllFromIndex('webhook-messages', 'by-webhook-id', webhookId)
}

export const deleteWebhookMessage = async (messageId: string): Promise<void> => {
  const database = await getDatabase()
  await database.delete('webhook-messages', messageId)
}
