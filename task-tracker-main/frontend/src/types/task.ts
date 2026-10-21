export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
  priority: TaskPriority
  tag: string
  project: string
  owner: string
}

export type TaskDraft = Omit<Task, 'id'>
