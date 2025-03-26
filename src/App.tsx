import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';
import { supabase } from './lib/supabase';
import type { Task, CreateTaskInput } from './types/tasks';
import { ClipboardList } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (input: CreateTaskInput) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...input, completed: false }])
        .select()
        .single();

      if (error) throw error;
      setTasks([data, ...tasks]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed } : task
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const editTask = async (id: string, title: string, description: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ title, description })
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, title, description } : task
      ));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <ClipboardList className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="mt-2 text-gray-600">Organize your tasks efficiently</p>
        </div>

        <div className="space-y-6">
          <TaskForm onSubmit={createTask} />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;