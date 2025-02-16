import { PublishCommand, SNSClient } from "@aws-sdk/client-sns"
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs"

type AwsConfig = {
  endpoint?: string
  region: string
  accessKeyId: string
  secretKey: string
}

type MessageConfig = {
  resourceUrl: string
  groupId: string
  message: string
}

export type awsProps = AwsConfig & MessageConfig

export async function sendSqsMessage(props: awsProps) {
  const client = new SQSClient({
    endpoint: props.endpoint,
    region: props.region,
    credentials: {
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretKey
    }
  })

  const command = new SendMessageCommand({
    QueueUrl: props.resourceUrl,
    MessageBody: props.message,
    MessageGroupId: props.groupId
  })

  try {
    await client.send(command)
  } catch (error) {
    console.error(error)

    throw error
  }
}

export async function sendSnsMessage(props: awsProps) {
  const client = new SNSClient({
    endpoint: props.endpoint,
    region: props.region,
    credentials: {
      accessKeyId: props.accessKeyId,
      secretAccessKey: props.secretKey
    }
  })

  const command = new PublishCommand({
    TopicArn: props.resourceUrl,
    Message: props.message,
    MessageGroupId: props.groupId
  })

  try {
    await client.send(command)
  } catch (error) {
    console.error(error)

    throw error
  }
}
