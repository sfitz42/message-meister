import React, { FormEvent } from 'react';

import { TextInput } from '../../components/TextInput/TextInput';
import { SendButton, SendStatus } from '../../components/SendButton/SendButton';

import { sendSnsMessage, sendSqsMessage, awsProps } from '../../utils/aws';
import { CodeInput } from '../../components/CodeInput/CodeInput';
import { CheckboxInput } from '../../components/CheckboxInput/CheckboxInput';

export function AwsSender() {
  const [sending, setSending] = React.useState(SendStatus.Idle)
  const [fifo, setFifo] = React.useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSending(SendStatus.Sending)

    const formData = new FormData(event.currentTarget)

    const resourceUrl = formData.get("resourceUrl") as string

    const props: awsProps = {
      endpoint: formData.get("localstackEndpoint") as string,
      resourceUrl,
      region: formData.get("region") as string,
      accessKeyId: formData.get("accessKey") as string,
      secretKey: formData.get("secretKey") as string,
      message: formData.get("message") as string,
      groupId: formData.get("groupId") as string,
      deduplicationId: formData.get("deduplicationId") as string,
    }

    try {
      if (resourceUrl.includes("sqs")) {
        await sendSqsMessage(props)
      } else {
        await sendSnsMessage(props)
      }

      setSending(SendStatus.Sent)
    } catch (error) {
      console.error(error)
      setSending(SendStatus.Error)
    }

    setTimeout(() => {
      setSending(SendStatus.Idle)
    }, 5000)
  }

  const handleFifoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFifo(event.target.checked)
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="queue-inputs">
        <TextInput label="LocalStack Endpoint" name="localstackEndpoint" />
        <TextInput label="Queue / Topic" name="resourceUrl" />
        <CheckboxInput label="Is Queue FIFO?" name="fifo" onChange={handleFifoChange} />
        <TextInput label="Region" name="region" />
        <TextInput label="Access Key ID" name="accessKey" />
        <TextInput label="Secret Key" name="secretKey" />

        {fifo && <TextInput label="Message Group ID" name="groupId" />}
        {fifo && <TextInput label="Deduplication ID" name="deduplicationId" />}
        
        <CodeInput label="Message" name="message" />

        <SendButton sending={sending} />
      </form>
    </div>
  );
}
