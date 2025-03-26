import { useState } from 'react'
import { createTask } from '../lib/tasks'

export default function AddTask() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTask({
        title,
        user_id: (await supabase.auth.getUser()).data.user?.id || '',
        is_complete: false
      })
      setTitle('')
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />
      <button type="submit">Add Task</button>
    </form>
  )
}