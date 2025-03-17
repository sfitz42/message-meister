type TextInputProps = {
  label: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function TextInput({ label, name, onChange }: TextInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" name={name} onChange={onChange} />
    </div>
  )
}
