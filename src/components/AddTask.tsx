import { useState } from 'react';  // <-- Add this line
// src/components/AddTask.jsx
const AddTask = () => {
    const [title, setTitle] = useState('')
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      await createTask(title) // No user check needed
      setTitle('')
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add task..."
        />
      </form>
    )
  }