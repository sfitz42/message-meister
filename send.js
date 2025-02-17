import { ServiceBusClient } from '@azure/service-bus'

async function main() {
  const client = new ServiceBusClient('Endpoint=sb://localhost:5672;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SAS_KEY_VALUE;UseDevelopmentEmulator=true;')

  const sender = client.createSender('test-topic')

  const message = {
    body: 'Hello, World!',
    label: 'greeting',
    userProperties: {
      myCustomPropertyName: 'my custom property value'
    }
  }

  try {
    await sender.sendMessages(message)

    console.dir(sender.prototype._context.connection, { depth: 10 })

    console.log('Sent message:', message)
  } catch (error) {
    console.log('Error sending message:', error)
  }

  return client.close()
}

await main()
