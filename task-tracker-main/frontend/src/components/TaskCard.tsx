import { Link } from 'react-router'
import type { Task } from '../types/task'

type TaskCardProps = {
  task: Task
}

const statusLabels: Record<Task['status'], string> = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Готово',
}

const priorityLabels: Record<Task['priority'], string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card__meta">
        <span className="task-card__tag">{task.tag}</span>
        <span className={`task-card__status task-card__status--${task.status}`}>
          {statusLabels[task.status]}
        </span>
      </div>

      <h2>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </h2>

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
      </dl>
    </article>
  )
}
