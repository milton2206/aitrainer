import './OptionGroup.css'

/**
 * Группа выбора из вариантов.
 * multi=false — одиночный выбор (value — строка/число).
 * multi=true  — мультивыбор (value — массив).
 */
export default function OptionGroup({ label, options, value, onChange, multi = false }) {
  const isSelected = (optValue) =>
    multi ? value.includes(optValue) : value === optValue

  const handleClick = (optValue) => {
    if (multi) {
      onChange(
        value.includes(optValue)
          ? value.filter((v) => v !== optValue)
          : [...value, optValue],
      )
    } else {
      onChange(optValue)
    }
  }

  return (
    <fieldset className="option-group">
      <legend className="option-group__label">{label}</legend>
      <div className="option-group__list">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={
              'option-btn' + (isSelected(opt.value) ? ' option-btn--active' : '')
            }
            aria-pressed={isSelected(opt.value)}
            onClick={() => handleClick(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}
