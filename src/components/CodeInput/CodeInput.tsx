type CodeInputProps = {
  label: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function CodeInput({ label, name, onChange }: CodeInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} onChange={onChange}></textarea>
    </div>
  )
}
