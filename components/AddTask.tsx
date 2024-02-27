"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { AddTodo } from "@/api";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>(""); // New state for task description
  const [taskTimeline, setTaskTimeline] = useState<string>(""); // New state for task timeline
  const [taskStatus, setTaskStatus] = useState<string>(""); // New state for task status

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(newTaskValue);
    // Updated AddTodo function call to include description and timeline
    await AddTodo({
      id: Math.random().toString(),
      text: newTaskValue,
      title: "",
      description: taskDescription,
      timeline: taskTimeline,
      status: taskStatus
      
    });
    setNewTaskValue("");
    setTaskDescription(""); // Clear task description after submission
    setTaskTimeline(""); // Clear task timeline after submission
    setTaskStatus(""); // Clear task status after submission
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className='btn btn-light w-full'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-values'>
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type='text'
              placeholder='Type your task here'
              className='input input-bordered w-full'
            />
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
    </div>
  );
};

export default AddTask;
