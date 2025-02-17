import React, { FormEvent } from 'react';

import { TextInput } from '../../components/TextInput/TextInput';
import { SendButton, SendStatus } from '../../components/SendButton/SendButton';

import { CodeInput } from '../../components/CodeInput/CodeInput';
import { sendServiceBusMessage, ServiceBusProps } from '../../utils/service-bus';

export function ServiceBusSender() {
  const [sending, setSending] = React.useState(SendStatus.Idle)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(SendStatus.Sending)

    const formData = new FormData(event.currentTarget)

    const props: ServiceBusProps = {
      connectionString: formData.get("serviceBusConnectionString") as string,
      address: formData.get("serviceBusAddress") as string,
      message: formData.get("message") as string
    }

    try {
      await sendServiceBusMessage(props)
      setSending(SendStatus.Sent)
    } catch (error) {
      console.error(error)
      setSending(SendStatus.Error)
    }

    setTimeout(() => {
      setSending(SendStatus.Idle)
    }, 5000)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="queue-inputs">
        <TextInput label="Connection String" name="serviceBusConnectionString" />
        <TextInput label="Queue / Topic Address" name="serviceBusAddress" />
        <CodeInput label="Message" name="message" />

        <SendButton sending={sending} />
      </form>
    </div>
  );
}
