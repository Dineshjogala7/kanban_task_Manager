import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import elips from '../assets/icon-vertical-ellipsis.svg'
import ElipsMenu from "../components/ElipsMenu"
import Subtask from "../components/Subtask"
import boardSlice from "../redux/boardSlice"
import DeleteModal from "./DeleteModal"
import AddEditTaskModal from "../modals/AddEditTaskModal"

const TaskModal = ({ colIndex, taskIndex, setisTaskModalOpen }) => {
    const boards = useSelector((state) => state.boards)
    const board = boards.find((board) => board.isActive)
    const columns = board.columns
    const col = columns.find((col, i) => colIndex === i)
    const task = col.tasks.find((tasks, i) => taskIndex === i)
    const subtasks = task.subtasks
    const dispatch = useDispatch();
    
    let completed = 0;
    const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++;
        }
    });
    
    const onDeleteBtnClick = () => {
        dispatch(boardSlice.actions.deleteTask({taskIndex, colIndex}))
        setIsDeleteModalOpen(false)
        setisTaskModalOpen(false)
    }
    
    const setOpenEditModal = () => {
        setIsAddTaskModalOpen(true)
        setElipsisMenuOpen(false)
    }

    const setOpenDeleteModal = () => {
        setIsDeleteModalOpen(true)
        setElipsisMenuOpen(false)
    }

    const [status, setStatus] = useState(task.status)
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))

    const onChange = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    const handleModalClose = () => {
        dispatch(boardSlice.actions.setTaskStatus({
            taskIndex,
            colIndex,
            newColIndex,
            status
        }))
        setisTaskModalOpen(false)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleModalClose()
        }
    }

    // Don't render TaskModal if edit modal is open
    if (isAddTaskModalOpen) {
        return (
            <AddEditTaskModal  
                type={'edit'} 
                device={'mobile'} 
                setOpenAddEditTaskModal={setIsAddTaskModalOpen}
                prevColIndex={colIndex} 
                taskIndex={taskIndex} 
                setisTaskModalOpen={setisTaskModalOpen}
            />
        )
    }

    return (
        <div 
            onClick={handleBackdropClick}
            className="fixed right-0 left-0 bottom-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]"
        >
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto px-8 py-8 rounded-xl w-full">
                <div className="relative flex justify-around w-full items-center">
                    <h1 className="text-lg">{task.title}</h1>
                    <img 
                        src={elips} 
                        alt="elips" 
                        className="cursor-pointer h-6" 
                        onClick={() => { setElipsisMenuOpen(!elipsisMenuOpen) }}
                    />
                    {elipsisMenuOpen && 
                        <ElipsMenu 
                            setOpenEditModal={setOpenEditModal} 
                            setOpenDeleteModal={setOpenDeleteModal} 
                            type='Task'
                        />
                    }
                </div>

                <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
                    {task.description}
                </p>

                <p className="pt-6 text-gray-500 tracking-widest text-sm">
                    subtasks {completed} of {subtasks.length}
                </p>

                <div>
                    {subtasks.map((subtask, i) => (
                        <Subtask 
                            key={i} 
                            index={i} 
                            taskIndex={taskIndex} 
                            colIndex={colIndex}
                        />
                    ))}
                </div>

                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">
                        Change Your col
                    </label>
                    <select 
                        onChange={onChange} 
                        value={status} 
                        className="select-status dark:text-white dark:bg-transparent flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
                    >
                        {columns.map((col, index) => (
                            <option 
                                value={col.name} 
                                key={index} 
                                className="bg-transparent dark:text-white dark:bg-gray-500"
                            >
                                {col.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            {isDeleteModalOpen && (
                <DeleteModal 
                    onDeleteBtnClick={onDeleteBtnClick} 
                    title={task.title} 
                    type={'task'} 
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                />
            )}
        </div>
    )
}

export default TaskModal