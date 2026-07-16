import { useState } from 'react'
import './App.css'
import { generateProgram } from './engine/generateProgram.js'
import QuestionnaireScreen from './screens/QuestionnaireScreen.jsx'
import ParQScreen from './screens/ParQScreen.jsx'
import DoctorConsultScreen from './screens/DoctorConsultScreen.jsx'
import LimitationsScreen from './screens/LimitationsScreen.jsx'
import ResultScreen from './screens/ResultScreen.jsx'

const STEPS = {
  QUESTIONNAIRE: 'questionnaire', // анкета
  PARQ: 'parq', // скрининг здоровья
  BLOCKED: 'blocked', // хотя бы одно "да" — к врачу
  LIMITATIONS: 'limitations', // ограничения по зонам
  PROGRAM: 'program', // готовая программа
}

export default function App() {
  const [step, setStep] = useState(STEPS.QUESTIONNAIRE)
  const [profile, setProfile] = useState(null)
  const [parq, setParq] = useState(null)
  const [program, setProgram] = useState(null)

  const handleProfile = (form) => {
    setProfile(form)
    setStep(STEPS.PARQ)
  }

  const handleParqResult = ({ answers, anyYes }) => {
    setParq(answers)
    // Хотя бы один "да" — блокируем генерацию и отправляем к врачу.
    setStep(anyYes ? STEPS.BLOCKED : STEPS.LIMITATIONS)
  }

  const handleLimitations = (limitations) => {
    // Генерация программы на правилах и переход к результату.
    setProgram(generateProgram(profile, limitations))
    setStep(STEPS.PROGRAM)
  }

  const restart = () => {
    setProfile(null)
    setParq(null)
    setProgram(null)
    setStep(STEPS.QUESTIONNAIRE)
  }

  return (
    <div className="app-container">
      {step === STEPS.QUESTIONNAIRE && (
        <QuestionnaireScreen onNext={handleProfile} />
      )}

      {step === STEPS.PARQ && (
        <ParQScreen
          onResult={handleParqResult}
          onBack={() => setStep(STEPS.QUESTIONNAIRE)}
        />
      )}

      {step === STEPS.BLOCKED && (
        <DoctorConsultScreen onBack={() => setStep(STEPS.PARQ)} />
      )}

      {step === STEPS.LIMITATIONS && (
        <LimitationsScreen
          onNext={handleLimitations}
          onBack={() => setStep(STEPS.PARQ)}
        />
      )}

      {step === STEPS.PROGRAM && program && (
        <ResultScreen program={program} onRestart={restart} />
      )}
    </div>
  )
}
