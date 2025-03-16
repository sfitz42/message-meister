import React, { FormEvent } from 'react';

import { TextInput } from '../../components/TextInput/TextInput';
import { SendButton, SendStatus } from '../../components/SendButton/SendButton';

import { CodeInput } from '../../components/CodeInput/CodeInput';
import { sendServiceBusMessage, ServiceBusProps } from '../../utils/service-bus';

export function ServiceBusSender() {
  const [sending, setSending] = React.useState(SendStatus.Idle)
  const [formData, setFormData] = React.useState<ServiceBusProps>({
    connectionString: "",
    address: "",
    message: ""
  })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSending(SendStatus.Sending)

    try {
      await sendServiceBusMessage(formData)
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
        <TextInput label="Connection String" name="serviceBusConnectionString" onChange={handleChange} />
        <TextInput label="Queue / Topic Address" name="serviceBusAddress" onChange={handleChange} />
        <CodeInput label="Message" name="message" onChange={handleChange} />

        <SendButton sending={sending} />
      </form>
    </div>
  );
}
