import { Link, useNavigate, useParams } from 'react-router'
import type { Task } from '../types/task'

const statusLabels = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Готово',
} as const

const priorityLabels = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
} as const

type TaskDetailsPageProps = {
  tasks: Task[]
  onDelete: (id: string) => void
}

export function TaskDetailsPage({ tasks, onDelete }: TaskDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return (
      <section className="page-section">
        <h1>Задача не найдена</h1>
        <p>Запись с идентификатором «{id ?? 'неизвестный'}» отсутствует в списке.</p>
        <Link className="primary-link" to="/tasks">
          К списку задач
        </Link>
      </section>
    )
  }

  return (
    <section className="page-section">
      <h1>{task.title}</h1>

      <article className="task-card task-card--details">
        <div className="task-card__meta">
          <span className="task-card__tag">{task.tag}</span>
          <span className={`task-card__status task-card__status--${task.status}`}>
            {statusLabels[task.status]}
          </span>
        </div>

        <p>{task.description}</p>

        <dl className="task-card__details">
          <div>
            <dt>Срок</dt>
            <dd>{task.dueDate}</dd>
          </div>
          <div>
            <dt>Приоритет</dt>
            <dd>{priorityLabels[task.priority]}</dd>
          </div>
          <div>
            <dt>Проект</dt>
            <dd>{task.project}</dd>
          </div>
          <div>
            <dt>Ответственный</dt>
            <dd>{task.owner}</dd>
          </div>
        </dl>
      </article>

      <div className="task-actions">
        <Link className="primary-link" to="/tasks">
          К списку задач
        </Link>
        <Link className="secondary-link" to={`/tasks/${task.id}/edit`}>
          Редактировать
        </Link>
        <button
          type="button"
          className="danger-button"
          onClick={() => {
            if (window.confirm(`Удалить задачу «${task.title}»?`)) {
              onDelete(task.id)
              navigate('/tasks', { replace: true })
            }
          }}
        >
          Удалить
        </button>
      </div>
    </section>
  )
}
