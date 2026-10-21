import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'

type TaskFormProps = {
  initialValues: TaskDraft
  onSave: (draft: TaskDraft) => void
  onCancel: () => void
}

export function TaskForm({ initialValues, onSave, onCancel }: TaskFormProps) {
  const [draft, setDraft] = useState<TaskDraft>(() => ({ ...initialValues }))
  const [error, setError] = useState('')

  function updateField<K extends keyof TaskDraft>(field: K, value: TaskDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = draft.title.trim()
    const trimmedDescription = draft.description.trim()
    const trimmedTag = draft.tag.trim()
    const trimmedProject = draft.project.trim()
    const trimmedOwner = draft.owner.trim()

    if (trimmedTitle.length < 3 || trimmedTitle.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }

    if (!draft.dueDate) {
      setError('Укажите срок задачи.')
      return
    }

    if (!trimmedDescription) {
      setError('Введите описание задачи.')
      return
    }

    if (draft.status === 'done' && trimmedDescription.length < 10) {
      setError('Завершённая задача должна иметь описание результата не короче 10 символов.')
      return
    }

    setError('')
    onSave({
      ...draft,
      title: trimmedTitle,
      description: trimmedDescription,
      tag: trimmedTag,
      project: trimmedProject || 'Task Tracker',
      owner: trimmedOwner || 'Петренко А.К.',
    })
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__grid">
        <label htmlFor="task-title">
          Название
          <input
            id="task-title"
            value={draft.title}
            required
            onChange={(event) => updateField('title', event.target.value)}
          />
        </label>

        <label htmlFor="task-date">
          Срок
          <input
            id="task-date"
            type="date"
            value={draft.dueDate}
            required
            onChange={(event) => updateField('dueDate', event.target.value)}
          />
        </label>
      </div>

      <label htmlFor="task-description">
        Описание
        <textarea
          id="task-description"
          value={draft.description}
          required
          onChange={(event) => updateField('description', event.target.value)}
        />
      </label>

      <div className="task-form__grid">
        <label htmlFor="task-status">
          Статус
          <select
            id="task-status"
            value={draft.status}
            onChange={(event) => {
              const status = event.target.value
              if (status === 'todo' || status === 'in_progress' || status === 'done') {
                updateField('status', status)
              }
            }}
          >
            <option value="todo">Запланировано</option>
            <option value="in_progress">В работе</option>
            <option value="done">Готово</option>
          </select>
        </label>

        <label htmlFor="task-priority">
          Приоритет
          <select
            id="task-priority"
            value={draft.priority}
            onChange={(event) => {
              const priority = event.target.value
              if (priority === 'low' || priority === 'medium' || priority === 'high') {
                updateField('priority', priority)
              }
            }}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
      </div>

      <div className="task-form__grid">
        <label htmlFor="task-tag">
          Тег
          <input
            id="task-tag"
            value={draft.tag}
            onChange={(event) => updateField('tag', event.target.value)}
          />
        </label>

        <label htmlFor="task-project">
          Проект
          <input
            id="task-project"
            value={draft.project}
            onChange={(event) => updateField('project', event.target.value)}
          />
        </label>
      </div>

      <label htmlFor="task-owner">
        Ответственный
        <input
          id="task-owner"
          value={draft.owner}
          onChange={(event) => updateField('owner', event.target.value)}
        />
      </label>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="task-form__actions">
        <button type="submit" className="primary-button">
          Сохранить
        </button>
        <button type="button" className="secondary-button" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  )
}
