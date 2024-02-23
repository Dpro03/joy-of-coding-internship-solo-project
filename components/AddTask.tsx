import { FaPlus } from "react-icons/fa6";
const AddTask = () => {
  return (
    <div>
        <button className='btn btn-primary w-full'>Add New Task 
        <FaPlus size={ 20 } className="ml-2" style={{ verticalAlign: 'middle' }}/></button>
    </div>
  )
}

export default AddTask