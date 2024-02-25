'use client';
import React, { useState } from 'react';
import { ITask } from '../types/tasks';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { editTodo, deleteTodo } from '../api'; // Assuming deleteTodo is also imported from api.ts
import { useRouter } from 'next/navigation'; // Changed next/navigation to next/router

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false); // Added state for delete modal
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
      title: ''
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
