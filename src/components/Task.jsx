import {useSelector} from 'react-redux'
import { useState } from 'react';
import TaskModal from '../modals/TaskModal';
const Task=({taskIndex,colIndex})=>{
    const boards = useSelector(state => state.boards);
    const board = boards.find((board) => board.isActive);
    const columns=board.columns
    const col=columns.find((col,i)=>i===colIndex);
    const task=col.tasks.find((task,i)=>i===taskIndex);

    const [isTaskModalOpen , setisTaskModalOpen]=useState(false);
    let completed=0;
    let subtasks=task.subtasks
    subtasks.forEach((subtask) => {
        if(subtask.isCompleted){
            completed++;
        }
    });

    return(
        <div>
            <div onClick={()=>{setisTaskModalOpen(true)}} className="  items-center w-[280px] first:my-5 bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer rounded-lg px-4">
                <p className="font-bold tracking-wide ">
                    {task.title}
                </p>
                <p className="font-bold text-xs tracking-tighter mt-2 text-gray-500">
                    {completed} of {subtasks.length} completed tasks
                </p>
            </div>

            {
                isTaskModalOpen && (<TaskModal colIndex={colIndex} taskIndex={taskIndex} setisTaskModalOpen={setisTaskModalOpen}/>)
            }
        </div>
    )
}
export default Task;