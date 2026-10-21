import { useState } from 'react'
import { Link } from 'react-router'
import { TaskCard } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task'

type TasksPageProps = {
  tasks: Task[]
}

export function TasksPage({ tasks }: TasksPageProps) {
  const [status, setStatus] = useState<TaskStatus | 'all'>('all')
  const visibleTasks = tasks.filter((task) => status === 'all' || task.status === status)

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Мои задачи</h1>
        <Link className="primary-link" to="/tasks/new">
          Добавить задачу
        </Link>
      </div>

      <div className="filter-panel">
        <label htmlFor="task-filter">Фильтр по статусу</label>
        <select
          id="task-filter"
          value={status}
          onChange={(event) => {
            const value = event.target.value
            if (value === 'all' || value === 'todo' || value === 'in_progress' || value === 'done') {
              setStatus(value)
            }
          }}
        >
          <option value="all">Все задачи</option>
          <option value="todo">Запланировано</option>
          <option value="in_progress">В работе</option>
          <option value="done">Готово</option>
        </select>
        <button type="button" className="secondary-button" onClick={() => setStatus('all')}>
          Сбросить фильтр
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>Задач пока нет.</p>
      ) : visibleTasks.length === 0 ? (
        <p>Подходящих задач не найдено.</p>
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  )
}
