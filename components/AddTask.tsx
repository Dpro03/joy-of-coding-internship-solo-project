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
    await AddTodo({
      id: Math.random().toString(),
      text: newTaskValue,
      title: "",
      description: taskDescription,
      timeline: taskTimeline,
      status: taskStatus
      
    });
    setNewTaskValue("");
    setTaskDescription(""); 
    setTaskTimeline(""); 
    setTaskStatus(""); 
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
<div className="flex justify-center">
  <button
    onClick={() => setModalOpen(true)}
    className="bg-pink-800 text-white active:bg-pink-700 font-bold uppercase text-sm px-6 py-3 
    rounded-xl shadow-md hover:bg-pink-600 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 
    ease-linear transition-all duration-150 btn btn-light w-1/3 border-2"
  >
    Add new task <AiOutlinePlus className="ml-2" size={18} />
  </button>
</div>

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
