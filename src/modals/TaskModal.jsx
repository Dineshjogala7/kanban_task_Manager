import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import elips from '../assets/icon-vertical-ellipsis.svg'
import ElipsMenu from "../components/ElipsMenu"
import Subtask from "../components/Subtask"
import boardSlice from "../redux/boardSlice"
const TaskModal=({colIndex, taskIndex , setisTaskModalOpen})=>{
    const boards=useSelector((state)=>state.boards)
    const board=boards.find((board)=>board.isActive)
    const columns = board.columns
    const col=columns.find((col,i)=>colIndex === i)
    const task =col.tasks.find((tasks,i)=>taskIndex===i)
    const subtasks =task.subtasks
    const dispatch=useDispatch();
    let completed=0;
    
    const [elipsisMenuOpen,setElipsisMenuOpen]=useState(false)
    subtasks.forEach((subtask) => {
        if(subtask.isCompleted){
            completed++;
        }
    });
   
    const setOpenEditModal=()=>{
       
    }
    const setOpenDeleteModal=()=>{
        
    }
    const onChange=(e)=>{
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }
    const [status,setStatus]=useState(task.status)
    const [newColIndex, setNewColIndex]= useState(columns.indexOf(col))
    return(
        <div onClick={(e)=>{
            if(e.target===e.currentTarget){
                dispatch(boardSlice.actions.setTaskStatus({taskIndex , colIndex , newColIndex , status}))
                setisTaskModalOpen(false)
            }
            else{
                return
            }
        }} className="fixed right-0 left-0 bottom-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080] ">
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto px-8 py-8 rounded-xl w-full">

                <div className="relative flex justify-around w-full items-center">
                    <h1 className="text-lg">{task.title} </h1>
                    <img src={elips}  alt="elips" className="cursor-pointer h-6" onClick={()=>{setElipsisMenuOpen(true)}}/>

                    {elipsisMenuOpen && <ElipsMenu setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} type='Task'/>}
                 </div>

                <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6 ">
                    {task.description}
                </p>

                <p className="pt-6 text-gray-500 tracking-widest text-sm"> subtasks {completed} of {subtasks.length}</p>

                <div>
                    {subtasks.map((task,i)=>(
                        <Subtask key={i} index={i} taskIndex={taskIndex} colIndex={colIndex}/>
                    ))}
                </div>
                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">Change Your col </label>
                    <select onChange={onChange} value={status} className="select-status  dark:text-white  dark:bg-transparent flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none">
                        {
                            columns.map((col,index)=>(
                                <option value={col.name} key={index} className="bg-transparent dark:text-white dark:bg-gray-500">{col.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            
        </div>
    )
}

export default TaskModal
