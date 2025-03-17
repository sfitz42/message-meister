import { ServiceBusClient } from "@azure/service-bus"

type ServiceBusConfig = {
  connectionString: string
}

type MessageConfig = {
  address: string
  message: string
  contentType?: string
}

export type ServiceBusProps = ServiceBusConfig & MessageConfig

export async function sendServiceBusMessage(props: ServiceBusProps) {
  const client = new ServiceBusClient(props.connectionString, {
    webSocketOptions: undefined
  })

  const sender = client.createSender(props.address)

  try {
    await sender.sendMessages({
      body: props.message,
      contentType: props.contentType ?? "application/json"
    })
  } catch (error) {
    console.error(error)

    throw error
  }
}
