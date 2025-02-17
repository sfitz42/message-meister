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

  console.log("ServiceBusClient created")

  const sender = client.createSender(props.address)

  console.dir(sender, { depth: null })

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
