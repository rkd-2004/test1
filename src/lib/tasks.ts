import { supabase } from './supabase'
import { Task, TaskInsert } from './types/tasks'

export const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createTask = async (task: TaskInsert): Promise<Task> => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single()

  if (error) throw error
  return data
}

export const toggleTask = async (id: number, is_complete: boolean): Promise<void> => {
  const { error } = await supabase
    .from('tasks')
    .update({ is_complete })
    .eq('id', id)

  if (error) throw error
}