import './App.css'
import QuestionnaireScreen from './screens/QuestionnaireScreen.jsx'

export default function App() {
  const handleNext = (form) => {
    // Следующий экран пока в разработке — сохранённые данные логируем.
    console.log('Данные анкеты:', form)
  }

  return (
    <div className="app-container">
      <QuestionnaireScreen onNext={handleNext} />
    </div>
  )
}
