export enum SendStatus {
  Idle = "Send",
  Sending = "Sending...",
  Sent = "Sent",
  Error = "Failed, retry?"
}

function sendStatusToClass(status: SendStatus) {
  switch (status) {
    case SendStatus.Idle:
      return ""
    case SendStatus.Sending:
      return "disabled"
    case SendStatus.Sent:
      return "success"
    case SendStatus.Error:
      return "error"
  }
}

export function SendButton({ sending }: { sending: SendStatus }) {
  return (
    <button type="submit"
      className={`send-message ${sendStatusToClass(sending)}`}
      disabled={sending === SendStatus.Sending}>
      {sending}
    </button>
  )
}
