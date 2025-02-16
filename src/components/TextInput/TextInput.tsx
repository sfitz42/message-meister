type TextInputProps = {
  label: string
  name: string
}

export function TextInput({ label, name }: TextInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" name={name} />
    </div>
  )
}
