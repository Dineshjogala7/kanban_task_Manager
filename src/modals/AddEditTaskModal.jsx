import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import boardSlice from "../redux/boardSlice";
import {useDispatch, useSelector} from 'react-redux'
const AddEditTaskModal=({type,device,setOpenAddEditTaskModal,prevColIndex=0,taskIndex})=>{
    const [title,setTitle]=useState("");
    const board=useSelector((state)=>state.boards).find((board)=>board.isActive)
    const column=board.columns
    const col=column.find((col,index)=>index===prevColIndex)
    const dispatch=useDispatch()
    const [status,setStatus]=useState(column[prevColIndex].name)
    const [isValid,setValid]=useState(true)
    const [newColIndex,setNewColIndex]=useState(prevColIndex)
    const validate=()=>{
        setValid(false);
        if(!title.trim()){
            return false
        }
        for(let i=0;i<subtasks.length;i++){
            if(!subtasks[i].title.trim()){
                return false
            }
        }
        setValid(true)
        return true
    }
    const onChangeStatus=(e)=>{
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }
    const [description,setDescription]=useState("")
    const [subtasks,setSubtask]=useState(
        [
            {title:"",isCompleted:false,id:uuidv4()},
            {title:"",isCompleted:false,id:uuidv4()}
        ]
    )
    const onChange=(id,newValue)=>{
        setSubtask((prevState)=>{
            const state=[...prevState];
            const task=state.find((state)=>state.id===id);
            task.title=newValue;

            return state
        })
    }
    const onDelete=(id)=>{
        setSubtask((prevState)=>{
            const newState=prevState.filter((state)=>state.id!==id)
            return newState
        })
    }
    const onSubmit=(type)=>{
        if(type==='add'){
            dispatch(boardSlice.actions.addTask({
               title,description,subtasks,status,newColIndex   
            }))
        }
        else{
            dispatch(boardSlice.actions.editTask({
                title,description,subtasks,status,taskIndex,prevColIndex,newColIndex
            }))
        }
    }
    return(
        <div onClick={(e)=>{
            if(e.target===e.currentTarget) setOpenAddEditTaskModal(false)
        }}className={device==='mobile' ? 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]' : 'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]'}>
            {/* {modal Section} */}
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto px-8 py-8 rounded-xl w-full">

                <h3 className="text-lg ">
                    {type === 'edit' ? 'Edit' :'Add New'} Task
                </h3>
                <div className="mt-8 flex flex-col space-y-1">
                <label className="text-sm dark:text-white text-gray-500">
                    Task Name
                </label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0" placeholder="e.g Take a Coffee Break"
                />
                </div>
                <div className="mt-8 flex flex-col space-y-1">
                    <label className="text-sm dark:text-white text-gray-500">
                        Task Name
                    </label>
                    <textarea value={description} placeholder="e.g Taking a 15 min break will always a better task to stay focussed" onChange={(e)=>setDescription(e.target.value)}
                        className=" bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0 max-h-[200px] h-full overflow-y-scroll scrollbar-hide">

                    </textarea>
                </div>
               {/* subtasks */}

               <div className="mt-8 flex flex-col space-y-2">
                    <label className="text-sm dark:text-white text-gray-500">
                       SUB TASKS
                    </label>
                    {
                        subtasks.map((subtask,index)=>(
                            <div className="flex items-center">
                                
                            <input onChange={(e)=>{
                                onChange(subtask.id,e.target.value)
                            }}  type="text" value={subtask.title} className=" flex-1 bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0" placeholder="e.g 15 min break"/>
                            <DeleteIcon className="ml-4 cursor-pointer" onClick={()=>onDelete(subtask.id)}/>
                   
                            </div>
                        ))
                    }
                    
                    <button onClick={()=>setSubtask((state)=>[...state,{title:"",isCompleted:false,id:uuidv4()}])} className="w-full py-2 px-4 items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] rounded-full mt-8 hover:opacity-75"> Add New SubTask</button>
               </div>

               {/* Current Status Section */}

               <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">
                        Current Status
                    </label>
                    <select value={status}onChange={(e)=>onChangeStatus(e)} className="select-status  dark:text-white  dark:bg-transparent flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none">
                        {
                            column.map((col,index)=>(
                                <option value={col.name} key={index} className="bg-transparent dark:text-white dark:bg-gray-500">{col.name}</option>
                            ))
                        }
                    </select>
                    <button onClick={()=>{
                        const Valid=validate()
                        if(Valid===true){
                            onSubmit(type)
                            setOpenAddEditTaskModal(false)
                            console.log("Clicked the Edit or Task button in Task Edit Modal");
                        }
                    }} className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"> {type==='edit' ? 'Save Edit' : 'Create Task'}</button>

               </div>
               
                
            </div>
            


        </div>
    )
}

export default AddEditTaskModal;