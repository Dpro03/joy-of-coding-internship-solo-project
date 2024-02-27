import React from 'react';
import { ITask } from '../types/tasks';
import Task from './Task';

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Description</th>
            <th>Timeline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <p className="text-gray-500 text-sm mt-4">Timeline: {new Date().toLocaleString()}</p>
    </div>
  );
}

export default TaskList;
