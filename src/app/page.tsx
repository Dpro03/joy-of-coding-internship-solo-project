
import { useState, useEffect } from 'react';
import TaskList from '../../components/TaskList';
import AddTask from '../../components/AddTask';
import { getAllTasks } from '@/api';

export default async function Home() {
  const tasks = await getAllTasks();
  console.log(tasks);



  return (
    <main className='max-w-8xl mx-auto bg-emerald-800 mt-4 mb-4'>
      <div>
        <h1 className='text-center underline text text-3xl my-5 flex flex-col gap-4 font-bold'>
          Task List
        </h1>
        <AddTask />
        <TaskList tasks={tasks}/>
      </div>
    </main>
  );
}
