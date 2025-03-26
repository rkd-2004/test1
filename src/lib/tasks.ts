// src/lib/tasks.ts
import { supabase } from './supabase'

// Remove user_id from all queries
export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  return data || []
}

export const createTask = async (title: string) => {
  const { data } = await supabase
    .from('tasks')
    .insert({ title, completed: false })
    .select()
    .single()

  return data
}