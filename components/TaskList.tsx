'use client'
import React, { useState } from 'react';
import { ITask } from '../types/tasks';
import Task from './Task';
import TaskFilter from './TaskFilter'; // Import TaskFilter component

const TaskList: React.FC<{ tasks: ITask[] }> = ({ tasks }) => {
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(tasks);

  // Function to update the filtered tasks
  const handleFilterChange = (filteredTasks: ITask[]) => {
    setFilteredTasks(filteredTasks);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center mt-4">My Tasks</h2>
      <TaskFilter tasks={tasks} onFilterChange={handleFilterChange} /> {/* Use TaskFilter component */}
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr className='text-base font-medium text-black bg-neutral-400'>
            <th>Description</th>
            <th>Timeline</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <p className="text-gray-400 text-sm mt-4 mb-2">Timeline: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default TaskList;
