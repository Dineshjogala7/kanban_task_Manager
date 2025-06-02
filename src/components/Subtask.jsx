import { useSelector,useDispatch } from "react-redux"
import boardSlice from "../redux/boardSlice";
const Subtask=({index,taskIndex,colIndex})=>{
    const boards=useSelector((state)=>state.boards)
    const board=boards.find((board)=>board.isActive)
    const columns = board.columns
    const col=columns.find((col,i)=>colIndex === i)
    const task =col.tasks.find((tasks,i)=>taskIndex===i)
    const subtask=task.subtasks.find((subtask,i)=>i===index)
    const checked=subtask.isCompleted
    const dispatch=useDispatch()
    const onChange=()=>{
        dispatch(boardSlice.actions.setSubTaskCompleted({index,taskIndex,colIndex}))
    }
    return(
        <div className="w-full flex hover:bg-[#635fc740] drak:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd] mt-4">
            <input type="checkbox" className="w-4 h-4 accent-[#635fc7] cursor-pointer" checked={checked} onChange={onChange} />
            <p className={checked && 'line-through opacity-30'}>{subtask.title}</p>
            
        </div>
    )
}

export default Subtask