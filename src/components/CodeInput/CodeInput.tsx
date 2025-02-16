type CodeInputProps = {
  label: string
  name: string
}

export function CodeInput({ label, name }: CodeInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name}></textarea>
    </div>
  )
}
