import React, { FormEvent } from 'react';

import { TextInput } from '../../../components/TextInput/TextInput';
import { SendButton, SendStatus } from '../../../components/SendButton/SendButton';

import { CodeInput } from '../../../components/CodeInput/CodeInput';

export function ServiceBusMessageSender() {
  const [sending, setSending] = React.useState(SendStatus.Idle)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(SendStatus.Sending)
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
