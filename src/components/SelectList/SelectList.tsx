import './SelectList.css'

type SelectListProps = {
  name: string
  options: string[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function SelectList({ name, options, onChange }: SelectListProps) {
  return (
    <div className="input-group">
      <select id={name} name={name} onChange={onChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
