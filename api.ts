import { ITask } from "./types/tasks";

const baseUrl = 'http://localhost:3001/';

export const getAllTasks = async (): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}tasks`); 
    const tasks = await response.json();
    return tasks;
}