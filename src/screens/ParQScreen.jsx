import { useState } from 'react'
import OptionGroup from '../components/OptionGroup.jsx'

// 7 стандартных вопросов PAR-Q. Ответ "Да" хотя бы на один — стоп-сигнал.
const QUESTIONS = [
  'Говорил ли врач, что у вас есть проблемы с сердцем и заниматься физической активностью можно только под наблюдением врача?',
  'Бывает ли у вас боль в груди при физической активности?',
  'Была ли у вас боль в груди в состоянии покоя за последний месяц?',
  'Теряли ли вы равновесие из-за головокружения или теряли сознание?',
  'Есть ли у вас проблемы с костями или суставами, которые могут ухудшиться от физической нагрузки?',
  'Назначал ли вам врач лекарства от повышенного давления или болезней сердца?',
  'Знаете ли вы другую причину, по которой вам нельзя заниматься физической активностью?',
]

const YES_NO = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
]

export default function ParQScreen({ onResult, onBack }) {
  const [answers, setAnswers] = useState({})

  const setAnswer = (index) => (value) =>
    setAnswers((prev) => ({ ...prev, [index]: value }))

  const isComplete = QUESTIONS.every((_, i) => answers[i] != null)

  const handleSubmit = () => {
    if (!isComplete) return
    const anyYes = Object.values(answers).some((v) => v === 'yes')
    onResult({ answers, anyYes })
  }

  return (
    <main className="screen">
      <h1 className="screen__title">Скрининг здоровья (PAR-Q)</h1>
      <p className="screen__hint">
        Ответьте на 7 вопросов о самочувствии — это нужно, чтобы заниматься
        безопасно.
      </p>

      {QUESTIONS.map((q, i) => (
        <OptionGroup
          key={i}
          label={`${i + 1}. ${q}`}
          options={YES_NO}
          value={answers[i] ?? null}
          onChange={setAnswer(i)}
        />
      ))}

      <button
        type="button"
        className="btn-primary"
        disabled={!isComplete}
        onClick={handleSubmit}
      >
        Далее
      </button>
      <button type="button" className="btn-ghost" onClick={onBack}>
        Назад
      </button>
    </main>
  )
}
