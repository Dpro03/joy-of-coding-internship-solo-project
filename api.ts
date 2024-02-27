import { ITask } from "./types/tasks";

const baseUrl = 'http://localhost:3001';

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}

export const AddTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const { id, timeline, status, ...rest } = todo; // Destructure description and timeline, and spread the rest of the properties
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...rest, timeline, status }) // Spread rest, and add timeline and status explicitly
  });
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
  })
}

