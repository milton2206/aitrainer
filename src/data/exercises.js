// База упражнений для движка генерации (без ИИ).
//
// Поля:
//   id      — уникальный идентификатор
//   name    — название
//   group   — группа мышц (код): chest, back, legs, shoulders, biceps,
//             triceps, core, calves, cardio
//   equipment — необходимое оборудование (коды из анкеты):
//             bodyweight, dumbbells, barbell, machines, bands
//   level   — сложность: 1 (новичок), 2 (средний), 3 (продвинутый)
//   contra  — противопоказания (теги): knees, back, shoulders, heart

export const MUSCLE_LABEL = {
  chest: 'Грудь',
  back: 'Спина',
  legs: 'Ноги',
  shoulders: 'Плечи',
  biceps: 'Бицепс',
  triceps: 'Трицепс',
  core: 'Кор',
  calves: 'Икры',
  cardio: 'Кардио',
}

export const EXERCISES = [
  // ===== Грудь =====
  { id: 'push_up', name: 'Отжимания от пола', group: 'chest', equipment: ['bodyweight'], level: 1, contra: ['shoulders'] },
  { id: 'push_up_knee', name: 'Отжимания с колен', group: 'chest', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'incline_push_up', name: 'Отжимания с наклоном (руки выше)', group: 'chest', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'db_bench', name: 'Жим гантелей лёжа', group: 'chest', equipment: ['dumbbells'], level: 2, contra: ['shoulders'] },
  { id: 'db_fly', name: 'Разведение гантелей лёжа', group: 'chest', equipment: ['dumbbells'], level: 2, contra: ['shoulders'] },
  { id: 'bb_bench', name: 'Жим штанги лёжа', group: 'chest', equipment: ['barbell'], level: 2, contra: ['shoulders'] },
  { id: 'machine_press', name: 'Жим в тренажёре на грудь', group: 'chest', equipment: ['machines'], level: 1, contra: [] },
  { id: 'pec_deck', name: 'Сведение в тренажёре (бабочка)', group: 'chest', equipment: ['machines'], level: 1, contra: [] },
  { id: 'band_chest', name: 'Жим резинки от груди', group: 'chest', equipment: ['bands'], level: 1, contra: [] },

  // ===== Спина =====
  { id: 'db_row', name: 'Тяга гантели в наклоне', group: 'back', equipment: ['dumbbells'], level: 1, contra: ['back'] },
  { id: 'bb_row', name: 'Тяга штанги в наклоне', group: 'back', equipment: ['barbell'], level: 2, contra: ['back'] },
  { id: 'pull_up', name: 'Подтягивания', group: 'back', equipment: ['bodyweight'], level: 3, contra: ['shoulders'] },
  { id: 'inverted_row', name: 'Австралийские подтягивания (горизонтальные)', group: 'back', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'lat_pulldown', name: 'Тяга верхнего блока', group: 'back', equipment: ['machines'], level: 1, contra: ['shoulders'] },
  { id: 'seated_row', name: 'Горизонтальная тяга в блоке', group: 'back', equipment: ['machines'], level: 1, contra: ['back'] },
  { id: 'band_row', name: 'Тяга резинки к поясу', group: 'back', equipment: ['bands'], level: 1, contra: [] },
  { id: 'superman', name: 'Супермен', group: 'back', equipment: ['bodyweight'], level: 1, contra: ['back'] },

  // ===== Ноги =====
  { id: 'bw_squat', name: 'Приседания с весом тела', group: 'legs', equipment: ['bodyweight'], level: 1, contra: ['knees'] },
  { id: 'lunges', name: 'Выпады', group: 'legs', equipment: ['bodyweight'], level: 2, contra: ['knees'] },
  { id: 'bb_squat', name: 'Приседания со штангой', group: 'legs', equipment: ['barbell'], level: 2, contra: ['knees', 'back'] },
  { id: 'goblet_squat', name: 'Гоблет-приседания с гантелей', group: 'legs', equipment: ['dumbbells'], level: 1, contra: ['knees'] },
  { id: 'leg_press', name: 'Жим ногами в тренажёре', group: 'legs', equipment: ['machines'], level: 1, contra: ['knees'] },
  { id: 'bb_rdl', name: 'Румынская тяга со штангой', group: 'legs', equipment: ['barbell'], level: 2, contra: ['back'] },
  { id: 'db_rdl', name: 'Румынская тяга с гантелями', group: 'legs', equipment: ['dumbbells'], level: 2, contra: ['back'] },
  { id: 'glute_bridge', name: 'Ягодичный мост', group: 'legs', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'hip_thrust', name: 'Мостик со штангой (хип-траст)', group: 'legs', equipment: ['barbell'], level: 2, contra: [] },
  { id: 'leg_ext', name: 'Разгибание ног в тренажёре', group: 'legs', equipment: ['machines'], level: 1, contra: ['knees'] },
  { id: 'leg_curl', name: 'Сгибание ног в тренажёре', group: 'legs', equipment: ['machines'], level: 1, contra: [] },
  { id: 'step_up', name: 'Зашагивания на возвышение', group: 'legs', equipment: ['dumbbells'], level: 2, contra: ['knees'] },
  { id: 'wall_sit', name: 'Стульчик у стены', group: 'legs', equipment: ['bodyweight'], level: 1, contra: ['knees'] },
  { id: 'band_squat', name: 'Приседания с резинкой', group: 'legs', equipment: ['bands'], level: 1, contra: ['knees'] },

  // ===== Плечи =====
  { id: 'pike_push_up', name: 'Отжимания «щучкой» (pike)', group: 'shoulders', equipment: ['bodyweight'], level: 2, contra: ['shoulders'] },
  { id: 'db_ohp', name: 'Жим гантелей вверх сидя', group: 'shoulders', equipment: ['dumbbells'], level: 2, contra: ['shoulders'] },
  { id: 'bb_ohp', name: 'Жим штанги стоя', group: 'shoulders', equipment: ['barbell'], level: 2, contra: ['shoulders'] },
  { id: 'db_lateral', name: 'Махи гантелями в стороны', group: 'shoulders', equipment: ['dumbbells'], level: 1, contra: ['shoulders'] },
  { id: 'band_lateral', name: 'Махи с резинкой в стороны', group: 'shoulders', equipment: ['bands'], level: 1, contra: [] },
  { id: 'machine_ohp', name: 'Жим в тренажёре на плечи', group: 'shoulders', equipment: ['machines'], level: 1, contra: ['shoulders'] },

  // ===== Бицепс =====
  { id: 'db_curl', name: 'Подъём гантелей на бицепс', group: 'biceps', equipment: ['dumbbells'], level: 1, contra: [] },
  { id: 'bb_curl', name: 'Сгибания со штангой на бицепс', group: 'biceps', equipment: ['barbell'], level: 1, contra: [] },
  { id: 'band_curl', name: 'Сгибания с резинкой на бицепс', group: 'biceps', equipment: ['bands'], level: 1, contra: [] },

  // ===== Трицепс =====
  { id: 'bench_dip', name: 'Обратные отжимания от скамьи', group: 'triceps', equipment: ['bodyweight'], level: 2, contra: ['shoulders'] },
  { id: 'triceps_pushdown', name: 'Разгибание на трицепс в блоке', group: 'triceps', equipment: ['machines'], level: 1, contra: [] },
  { id: 'db_triceps_ext', name: 'Французский жим гантелью', group: 'triceps', equipment: ['dumbbells'], level: 1, contra: ['shoulders'] },
  { id: 'diamond_push_up', name: 'Алмазные отжимания', group: 'triceps', equipment: ['bodyweight'], level: 2, contra: ['shoulders'] },

  // ===== Кор =====
  { id: 'plank', name: 'Планка', group: 'core', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'crunch', name: 'Скручивания', group: 'core', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'hanging_leg_raise', name: 'Подъём ног в висе', group: 'core', equipment: ['bodyweight'], level: 3, contra: ['back'] },
  { id: 'russian_twist', name: 'Русский твист', group: 'core', equipment: ['bodyweight'], level: 2, contra: ['back'] },
  { id: 'dead_bug', name: '«Мёртвый жук» (dead bug)', group: 'core', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'cable_crunch', name: 'Скручивания на верхнем блоке', group: 'core', equipment: ['machines'], level: 1, contra: [] },

  // ===== Икры =====
  { id: 'calf_raise', name: 'Подъём на носки стоя', group: 'calves', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'db_calf_raise', name: 'Подъём на носки с гантелями', group: 'calves', equipment: ['dumbbells'], level: 1, contra: [] },

  // ===== Кардио =====
  { id: 'jumping_jack', name: 'Джампинг-джек', group: 'cardio', equipment: ['bodyweight'], level: 1, contra: ['knees', 'heart'] },
  { id: 'burpee', name: 'Бёрпи', group: 'cardio', equipment: ['bodyweight'], level: 2, contra: ['knees', 'heart'] },
  { id: 'mountain_climber', name: 'Скалолаз (mountain climbers)', group: 'cardio', equipment: ['bodyweight'], level: 1, contra: [] },
  { id: 'high_knees', name: 'Бег на месте с подъёмом колен', group: 'cardio', equipment: ['bodyweight'], level: 1, contra: ['knees', 'heart'] },
]
