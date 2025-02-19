type CheckboxInputProps = {
  label: string
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function CheckboxInput({ label, name, onChange }: CheckboxInputProps) {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input id={name} type="checkbox" name={name} onChange={onChange} />
    </div>
  )
}
