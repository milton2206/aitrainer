import './ResultScreen.css'

export default function ResultScreen({ program, onRestart }) {
  const { meta, days, notes, excluded } = program

  return (
    <main className="screen">
      <h1 className="screen__title">Ваша программа</h1>
      <p className="screen__hint">
        {meta.goal} · {meta.level} · {meta.daysPerWeek} дн/нед · {meta.split}
      </p>

      {notes.length > 0 && (
        <div className="notice">
          {notes.map((n, i) => (
            <p key={i} className="notice__line">
              {n}
            </p>
          ))}
        </div>
      )}

      <div className="program">
        {days.map((day, i) => (
          <section key={i} className="day-card">
            <h2 className="day-card__title">{day.title}</h2>

            {day.exercises.length === 0 ? (
              <p className="day-card__empty">
                Нет подходящих упражнений под выбранное оборудование.
              </p>
            ) : (
              <ul className="ex-list">
                {day.exercises.map((ex, j) => (
                  <li key={j} className="ex-row">
                    <div className="ex-row__main">
                      <span className="ex-row__name">{ex.name}</span>
                      <span className="ex-row__muscle">{ex.muscle}</span>
                    </div>
                    <span className="ex-row__scheme">
                      {ex.isCardio
                        ? ex.reps
                        : `${ex.sets} × ${ex.reps}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {excluded.length > 0 && (
        <section className="excluded">
          <h2 className="excluded__title">Исключено из-за ограничений</h2>
          <ul className="excluded__list">
            {excluded.map((ex, i) => (
              <li key={i}>
                {ex.name} <span className="excluded__muscle">· {ex.muscle}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <button type="button" className="btn-ghost" onClick={onRestart}>
        Начать заново
      </button>
    </main>
  )
}
