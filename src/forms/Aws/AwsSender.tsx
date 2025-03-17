import React, { FormEvent } from 'react';

import { TextInput } from '../../components/TextInput/TextInput';
import { SendButton, SendStatus } from '../../components/SendButton/SendButton';

import { sendSnsMessage, sendSqsMessage, awsProps } from '../../utils/aws';
import { CodeInput } from '../../components/CodeInput/CodeInput';
import { AwsCliPreview } from './AwsCliPreview';

export function AwsSender() {
  const [sending, setSending] = React.useState(SendStatus.Idle)
  const [formData, setFormData] = React.useState<any>({})

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSending(SendStatus.Sending)

    const props = formData as awsProps

    try {
      if (props.resourceUrl.includes("sqs")) {
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

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="queue-inputs">
        <TextInput label="Endpoint" name="endpoint" onChange={handleChange} />
        <TextInput label="Queue URL / Topic ARN" name="resourceUrl" onChange={handleChange} />
        <TextInput label="Region" name="region" onChange={handleChange} />
        <TextInput label="Access Key ID" name="accessKeyId" onChange={handleChange} />
        <TextInput label="Secret Key" name="secretKey" onChange={handleChange} />

        {formData.resourceUrl?.endsWith(".fifo") && <TextInput label="Message Group ID" name="groupId" onChange={handleChange} />}
        {formData.resourceUrl?.endsWith(".fifo") && <TextInput label="Deduplication ID" name="deduplicationId" onChange={handleChange} />}
        
        <CodeInput label="Message" name="message" onChange={handleChange} />

        <SendButton sending={sending} />
      </form>

      <AwsCliPreview awsProps={formData as awsProps} />
    </div>
  );
}
