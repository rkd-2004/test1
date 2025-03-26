export interface Task {
  id: number
  title: string
  is_complete: boolean
  user_id: string
  created_at: string
}

export type TaskInsert = Omit<Task, 'id' | 'created_at'>