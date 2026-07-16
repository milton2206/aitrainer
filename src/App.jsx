import { useState } from 'react'
import './App.css'
import QuestionnaireScreen from './screens/QuestionnaireScreen.jsx'
import ParQScreen from './screens/ParQScreen.jsx'
import DoctorConsultScreen from './screens/DoctorConsultScreen.jsx'
import LimitationsScreen from './screens/LimitationsScreen.jsx'

const STEPS = {
  QUESTIONNAIRE: 'questionnaire', // анкета
  PARQ: 'parq', // скрининг здоровья
  BLOCKED: 'blocked', // хотя бы одно "да" — к врачу
  LIMITATIONS: 'limitations', // ограничения по зонам
}

export default function App() {
  const [step, setStep] = useState(STEPS.QUESTIONNAIRE)
  const [profile, setProfile] = useState(null)
  const [parq, setParq] = useState(null)

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
    // Экран генерации пока в разработке — собранные данные логируем.
    console.log('Данные для генерации:', { profile, parq, limitations })
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
    </div>
  )
}
