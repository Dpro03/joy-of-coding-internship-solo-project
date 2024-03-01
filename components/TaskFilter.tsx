import React, { useState } from 'react';
import { ITask } from '../types/tasks';

const TaskFilter: React.FC<{ tasks: ITask[], onFilterChange: (filteredTasks: ITask[]) => void }> = ({ tasks, onFilterChange }) => {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');

  // Function to filter tasks based on the selected timeline
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timeline = e.target.value;
    setSelectedTimeline(timeline);

    // Filter tasks based on the selected timeline
    const filteredTasks = timeline ? tasks.filter(task => task.timeline === timeline) : tasks;
    
    // Notify the parent component of the filtered tasks
    onFilterChange(filteredTasks);
  };

  return (
    <div>
      {/* Timeline filter UI component */}
      <select value={selectedTimeline} onChange={handleFilterChange}>
        <option value="">All Timelines</option>
        {/* Add options dynamically based on available timelines */}
        {Array.from(new Set(tasks.map(task => task.timeline))).map(timeline => (
          <option key={timeline} value={timeline}>{timeline}</option>
        ))}
      </select>
    </div>
  );
};

export default TaskFilter;
