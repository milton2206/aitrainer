import { useState } from 'react'
import OptionGroup from '../components/OptionGroup.jsx'
import './QuestionnaireScreen.css'

const GOALS = [
  { value: 'mass', label: 'Набор массы' },
  { value: 'loss', label: 'Похудение' },
  { value: 'strength', label: 'Сила' },
  { value: 'endurance', label: 'Выносливость' },
]

const LEVELS = [
  { value: 'beginner', label: 'Новичок' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
]

const EQUIPMENT = [
  { value: 'bodyweight', label: 'Только вес тела' },
  { value: 'dumbbells', label: 'Гантели' },
  { value: 'barbell', label: 'Штанга' },
  { value: 'machines', label: 'Тренажёры' },
  { value: 'bands', label: 'Резинки' },
]

const DAYS = [
  { value: 2, label: '2 дня' },
  { value: 3, label: '3 дня' },
  { value: 4, label: '4 дня' },
  { value: 5, label: '5 дней' },
]

const INITIAL_FORM = {
  goal: null,
  level: null,
  equipment: [],
  daysPerWeek: null,
}

export default function QuestionnaireScreen({ onNext }) {
  const [form, setForm] = useState(INITIAL_FORM)

  const update = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const isComplete =
    form.goal !== null &&
    form.level !== null &&
    form.equipment.length > 0 &&
    form.daysPerWeek !== null

  const handleSubmit = () => {
    if (!isComplete) return
    if (onNext) onNext(form)
    else console.log('Данные анкеты:', form)
  }

  // Подпись по значению; "—" если ещё не выбрано
  const labelOf = (options, value) =>
    options.find((o) => o.value === value)?.label ?? '—'
  const equipmentLabels = form.equipment.length
    ? form.equipment.map((v) => labelOf(EQUIPMENT, v)).join(', ')
    : '—'

  return (
    <main className="questionnaire">
      <h1 className="questionnaire__title">Расскажите о себе</h1>
      <p className="questionnaire__hint">
        Ответы помогут собрать программу под вас.
      </p>

      <OptionGroup
        label="Цель"
        options={GOALS}
        value={form.goal}
        onChange={update('goal')}
      />

      <OptionGroup
        label="Уровень"
        options={LEVELS}
        value={form.level}
        onChange={update('level')}
      />

      <OptionGroup
        label="Оборудование (можно несколько)"
        options={EQUIPMENT}
        value={form.equipment}
        onChange={update('equipment')}
        multi
      />

      <OptionGroup
        label="Сколько дней в неделю"
        options={DAYS}
        value={form.daysPerWeek}
        onChange={update('daysPerWeek')}
      />

      {/* ВРЕМЕННЫЙ блок для проверки сбора данных — убрать при генерации */}
      <div className="questionnaire__debug">
        <span className="questionnaire__debug-tag">проверка данных</span>
        <dl className="questionnaire__debug-list">
          <dt>Цель</dt>
          <dd>{labelOf(GOALS, form.goal)}</dd>
          <dt>Уровень</dt>
          <dd>{labelOf(LEVELS, form.level)}</dd>
          <dt>Оборудование</dt>
          <dd>{equipmentLabels}</dd>
          <dt>Дней в неделю</dt>
          <dd>{form.daysPerWeek ?? '—'}</dd>
        </dl>
      </div>

      <button
        type="button"
        className="questionnaire__next"
        disabled={!isComplete}
        onClick={handleSubmit}
      >
        Далее
      </button>
    </main>
  )
}
