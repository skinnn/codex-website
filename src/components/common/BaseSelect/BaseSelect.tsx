import './BaseSelect.css'

interface BaseSelectProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function BaseSelect({ 
  name, 
  label, 
  options, 
  placeholder = 'Select an option', 
  required,
  value,
  onChange 
}: BaseSelectProps) {
  return (
    <div className="base-select">
      <label className="base-select__label">{label}</label>
      <div className="base-select__wrapper">
        <select 
          name={name} 
          className="base-select__input" 
          required={required} 
          value={value}
          onChange={onChange}
          defaultValue={value === undefined ? "" : undefined}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg className="base-select__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}
