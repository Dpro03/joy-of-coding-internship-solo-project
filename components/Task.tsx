'use client';
import React, { useState } from 'react';
import { ITask } from '../types/tasks';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { editTodo, deleteTodo } from '../api'; 
import { useRouter } from 'next/navigation'; 

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false); 
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text ? task.text.toString() : '');
  const [taskTimeline, setTaskTimeline] = useState<string>(task.timeline || ''); 
  const [taskStatus, setTaskStatus] = useState<string>(task.status || ''); 

  const handleSubmitEditTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
      title: '',
      timeline: taskTimeline, 
      status: taskStatus 
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTodo(taskId);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      {/* Add task timeline and status here */}
      <td>{task.timeline}</td>
      <td>{task.status}</td>
      <td className='flex gap-12'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          className='text-yellow-300 cursor-pointer'
          size={20}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='modal-values'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Type your task here'
                className='input input-bordered w-full'
              />
              {/* Add input fields for task timeline and status */}
              <input
                value={taskTimeline}
                onChange={(e) => setTaskTimeline(e.target.value)}
                type='text'
                placeholder='Task timeline'
                className='input input-bordered w-full mt-2'
              />
              <input
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                type='text'
                placeholder='Task status'
                className='input input-bordered w-full mt-2'
              />
              <button type='submit' className='btn'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          className='text-red-500 cursor-pointer'
          size={20}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>Are you sure you want to delete this task?</h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>Yes</button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
