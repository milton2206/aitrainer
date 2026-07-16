import { EXERCISES, MUSCLE_LABEL } from '../data/exercises.js'

// Числовой уровень пользователя
const LEVEL_NUM = { beginner: 1, intermediate: 2, advanced: 3 }
const LEVEL_LABEL = { beginner: 'Новичок', intermediate: 'Средний', advanced: 'Продвинутый' }

// Параметры структуры по цели. sets зависят от уровня.
// cardio — длительность кардио-блока в день (или null, если не нужен).
const GOAL_CONFIG = {
  mass: { label: 'Набор массы', reps: '8–12', rest: '60–90 сек', cardio: null, setsByLevel: { 1: 3, 2: 4, 3: 4 } },
  loss: { label: 'Похудение', reps: '12–15', rest: '45–60 сек', cardio: '10–15 мин', setsByLevel: { 1: 3, 2: 3, 3: 4 } },
  strength: { label: 'Сила', reps: '3–6', rest: '2–3 мин', cardio: null, setsByLevel: { 1: 4, 2: 4, 3: 5 } },
  endurance: { label: 'Выносливость', reps: '15–20', rest: '30–45 сек', cardio: '15–20 мин', setsByLevel: { 1: 2, 2: 3, 3: 3 } },
}

// Сплиты по количеству дней. Каждый день — список групп мышц (слотов).
const SPLITS = {
  2: {
    name: 'Фулбоди 2 дня',
    days: [
      { name: 'Всё тело A', groups: ['legs', 'chest', 'back', 'shoulders', 'core'] },
      { name: 'Всё тело B', groups: ['legs', 'back', 'chest', 'biceps', 'triceps'] },
    ],
  },
  3: {
    name: 'Жим / Тяга / Ноги',
    days: [
      { name: 'Жим (грудь, плечи, трицепс)', groups: ['chest', 'chest', 'shoulders', 'triceps', 'core'] },
      { name: 'Тяга (спина, бицепс)', groups: ['back', 'back', 'biceps', 'biceps', 'core'] },
      { name: 'Ноги', groups: ['legs', 'legs', 'legs', 'calves', 'core'] },
    ],
  },
  4: {
    name: 'Верх / Низ ×2',
    days: [
      { name: 'Верх A', groups: ['chest', 'back', 'shoulders', 'triceps', 'biceps'] },
      { name: 'Низ A', groups: ['legs', 'legs', 'calves', 'core'] },
      { name: 'Верх B', groups: ['back', 'chest', 'shoulders', 'biceps', 'triceps'] },
      { name: 'Низ B', groups: ['legs', 'legs', 'calves', 'core'] },
    ],
  },
  5: {
    name: 'Сплит по группам',
    days: [
      { name: 'Грудь и трицепс', groups: ['chest', 'chest', 'triceps', 'triceps', 'core'] },
      { name: 'Спина и бицепс', groups: ['back', 'back', 'biceps', 'biceps', 'core'] },
      { name: 'Ноги', groups: ['legs', 'legs', 'legs', 'calves'] },
      { name: 'Плечи и кор', groups: ['shoulders', 'shoulders', 'core', 'core'] },
      { name: 'Всё тело', groups: ['legs', 'chest', 'back', 'shoulders'] },
    ],
  },
}

/**
 * Генерация программы тренировок на правилах.
 * @param {{goal,level,equipment,daysPerWeek}} profile — данные анкеты
 * @param {{problemAreas:string[]}} limitations — ограничения из опроса
 */
export function generateProgram(profile, limitations = {}) {
  const { goal, level, equipment = [], daysPerWeek } = profile
  const problemAreas = limitations.problemAreas ?? []
  const levelNum = LEVEL_NUM[level] ?? 1
  const cfg = GOAL_CONFIG[goal] ?? GOAL_CONFIG.mass
  const sets = cfg.setsByLevel[levelNum]

  // 1. Фильтр по оборудованию и уровню — доступный пул упражнений.
  const available = EXERCISES.filter(
    (ex) =>
      ex.level <= levelNum &&
      ex.equipment.every((eq) => equipment.includes(eq)),
  )

  // 2. Разделяем на безопасные и исключённые по противопоказаниям.
  const isBlocked = (ex) => ex.contra.some((tag) => problemAreas.includes(tag))
  const safe = available.filter((ex) => !isBlocked(ex))
  const excludedByLimits = available.filter(isBlocked)

  // 3. Подбор упражнения на группу мышц: избегаем повторов ради разнообразия,
  //    но если безопасные варианты закончились — разрешаем повтор.
  const used = new Set()
  const pickForGroup = (group) => {
    const candidates = safe.filter((ex) => ex.group === group)
    if (candidates.length === 0) return null
    const fresh = candidates.filter((ex) => !used.has(ex.id))
    const pool = fresh.length ? fresh : candidates
    const chosen = pool[0]
    used.add(chosen.id)
    return chosen
  }

  const template = SPLITS[daysPerWeek] ?? SPLITS[3]

  // 4. Собираем дни: каждый слот -> упражнение с подходами/повторами.
  const days = template.days.map((dayTpl, i) => {
    const seenInDay = new Set()
    const exercises = []

    for (const group of dayTpl.groups) {
      const ex = pickForGroup(group)
      if (ex && !seenInDay.has(ex.id)) {
        seenInDay.add(ex.id)
        exercises.push({
          name: ex.name,
          muscle: MUSCLE_LABEL[ex.group],
          sets,
          reps: cfg.reps,
          rest: cfg.rest,
        })
      }
    }

    // Кардио-блок для целей "похудение"/"выносливость".
    if (cfg.cardio) {
      const cardio = pickForGroup('cardio')
      if (cardio && !seenInDay.has(cardio.id)) {
        exercises.push({
          name: cardio.name,
          muscle: MUSCLE_LABEL.cardio,
          sets: null,
          reps: cfg.cardio,
          rest: '—',
          isCardio: true,
        })
      }
    }

    return { title: `День ${i + 1} — ${dayTpl.name}`, exercises }
  })

  // 5. Заметки — предупреждения при нехватке инвентаря/ограничениях.
  const notes = []
  if (days.some((d) => d.exercises.length === 0)) {
    notes.push(
      'Под выбранное оборудование удалось подобрать не всё — добавьте инвентарь для более полной программы.',
    )
  }
  if (excludedByLimits.length > 0) {
    notes.push(
      'Из-за ваших ограничений часть упражнений исключена и заменена безопасными на ту же группу мышц.',
    )
  }

  return {
    meta: {
      goal: cfg.label,
      level: LEVEL_LABEL[level] ?? level,
      daysPerWeek,
      split: template.name,
      reps: cfg.reps,
      rest: cfg.rest,
    },
    days,
    notes,
    excluded: excludedByLimits.map((ex) => ({
      name: ex.name,
      muscle: MUSCLE_LABEL[ex.group],
    })),
  }
}
