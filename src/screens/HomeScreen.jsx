import Badge from '../components/Badge.jsx'
import './HomeScreen.css'

export default function HomeScreen() {
  return (
    <main className="home">
      <h1 className="home__title">Генератор программ тренировок</h1>
      <Badge>в разработке</Badge>
      <p className="home__subtitle">
        Приложение находится в разработке. Здесь скоро появится подбор
        персональных программ тренировок.
      </p>
    </main>
  )
}
