import { useState } from 'react'
import OptionGroup from '../components/OptionGroup.jsx'

// Проблемные зоны — упражнения с нагрузкой на них будут исключены при генерации.
const AREAS = [
  { value: 'knees', label: 'Колени' },
  { value: 'back', label: 'Спина' },
  { value: 'shoulders', label: 'Плечи' },
]

export default function LimitationsScreen({ onNext, onBack }) {
  const [areas, setAreas] = useState([])

  const handleSubmit = () => {
    // Пустой список = ограничений нет. Экран всегда можно пройти дальше.
    onNext({ problemAreas: areas })
  }

  return (
    <main className="screen">
      <h1 className="screen__title">Есть ли ограничения?</h1>
      <p className="screen__hint">
        Отметьте проблемные зоны — упражнения с нагрузкой на них мы исключим.
        Если ограничений нет — просто нажмите «Далее».
      </p>

      <OptionGroup
        label="Проблемные зоны (можно несколько)"
        options={AREAS}
        value={areas}
        onChange={setAreas}
        multi
      />

      <button type="button" className="btn-primary" onClick={handleSubmit}>
        Далее
      </button>
      <button type="button" className="btn-ghost" onClick={onBack}>
        Назад
      </button>
    </main>
  )
}
