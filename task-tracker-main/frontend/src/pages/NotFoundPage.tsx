import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="page-section">
      <h1>Страница не найдена</h1>
      <p>Похоже, такой страницы в приложении пока нет.</p>
      <Link className="primary-link" to="/tasks">
        К списку задач
      </Link>
    </section>
  )
}
