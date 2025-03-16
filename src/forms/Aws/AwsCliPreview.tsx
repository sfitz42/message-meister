import "./code-preview.css"

import React from "react"

import { LuCopy } from "react-icons/lu"

import { awsProps } from "../../utils/aws"
import { CheckboxInput } from "../../components/CheckboxInput/CheckboxInput"

const specialCharacters = [
  { regex: /\n/g, replacement: "\\n" },
  { regex: /\r/g, replacement: "\\r" },
  { regex: /\t/g, replacement: "\\t" },
  { regex: /"/g, replacement: '\\"' },
]

const escapeMessage = (message: string) => {
  for (const character of specialCharacters) {
    message = message.replace(character.regex, character.replacement)
  }

  return message
}

const generateResourceOption = (sqs: boolean, resourceUrl: string) => {
  if (sqs) {
    return `--queue-url ${resourceUrl}`
  }

  return `--topic-arn ${resourceUrl}`
}

const generateMessageBodyOption = (sqs: boolean, message: string) => {
  if (!sqs) {
    return `--message "${escapeMessage(message)}"`
  }

  return `--message-body "${escapeMessage(message)}"`
}

const generateCli = (props: awsProps, localstack: boolean) => {
  if (!props.resourceUrl || !props.message) {
    return ""
  }

  const sqs = props.resourceUrl.includes("sqs")

  const options = []

  const command = localstack ? "awslocal" : "aws"

  if (!localstack && props.endpoint) {
    options.push(`--endpoint-url ${props.endpoint}`)
  }

  if (props.region) {
    options.push(`--region ${props.region}`)
  }

  if (props.resourceUrl) {
    options.push(generateResourceOption(sqs, props.resourceUrl))
  }

  if (props.message) {
    options.push(generateMessageBodyOption(sqs, props.message))
  }

  return `${command} ${sqs ? "sqs send-message" : "sns publish"} ${options.join(" ")}`
}

export function AwsCliPreview({ awsProps }: { awsProps: awsProps }) {
  const [localstack, setLocalstack] = React.useState(false)

  const cli = generateCli(awsProps, localstack) || "Provide at least a Queue URL / Topic ARN and Message to generate a CLI command"

  return (
    <div className="cli-preview">
      <h3>CLI Preview</h3>
      <CheckboxInput label="Use AWS Local?" name="localstack" onChange={() => setLocalstack(!localstack)} />
      <div className="cli-preview__command">
        <code>{cli}</code>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(cli)}>{<LuCopy />}</button>
      </div>
    </div>
  )
}
