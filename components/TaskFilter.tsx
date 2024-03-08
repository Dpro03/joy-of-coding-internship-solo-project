import React, { useState } from 'react';
import { ITask } from '../types/tasks';

const TaskFilter: React.FC<{ tasks: ITask[], onFilterChange: (filteredTasks: ITask[]) => void }> = ({ tasks, onFilterChange }) => {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timeline = e.target.value;
    setSelectedTimeline(timeline);

    const filteredTasks = timeline ? tasks.filter(task => task.timeline === timeline) : tasks;
    
    onFilterChange(filteredTasks);
  };

  return (
    <div>
      <select value={selectedTimeline} onChange={handleFilterChange}>
        <option value="">All Timelines</option>
        {Array.from(new Set(tasks.map(task => task.timeline))).map(timeline => (
          <option key={timeline} value={timeline}>{timeline}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
