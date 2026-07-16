import './DoctorConsultScreen.css'

// Вопросы, которые стоит задать врачу перед началом тренировок.
const DOCTOR_QUESTIONS = [
  'Какие виды и интенсивность нагрузки мне безопасны, а каких стоит избегать?',
  'Есть ли ограничения по пульсу или продолжительности тренировки?',
  'Нужно ли контролировать состояние (давление, самочувствие) во время занятий?',
  'Как мои лекарства влияют на переносимость физической нагрузки?',
  'Какие тревожные симптомы должны стать поводом прекратить тренировку?',
]

export default function DoctorConsultScreen({ onBack }) {
  return (
    <main className="screen">
      <h1 className="screen__title">
        Перед началом проконсультируйтесь с врачом
      </h1>
      <p className="screen__hint">
        Вы отметили хотя бы один пункт скрининга PAR-Q, который требует внимания
        врача.
      </p>

      <div className="notice">
        Это не значит, что вам нельзя тренироваться. Это значит, что перед
        началом программы важно получить одобрение врача — так занятия будут
        безопасными. После консультации вы сможете вернуться и продолжить.
      </div>

      <section className="doc-section">
        <h2 className="doc-section__title">Что спросить у врача</h2>
        <ul className="doc-list">
          {DOCTOR_QUESTIONS.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </section>

      <button type="button" className="btn-ghost" onClick={onBack}>
        Назад к скринингу
      </button>
    </main>
  )
}
