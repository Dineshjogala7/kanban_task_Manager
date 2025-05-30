import { useState } from "react"
import AddEditBoardModal from "../modals/AddEditBoardModal"

const EmptyBoard=({type})=>{
    const [isBoardModalOpen,setIsBoardModalOpen]=useState(false)
    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center">
            <h3 className="text-gray-500 font-bold">
                {type === 'edit' ? 'This is empty Board , create a new column to get started' : 'There are no boards availble . Create a new board to get started'}
            </h3>
            <button  onClick={()=>setIsBoardModalOpen(true)} className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white drak:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full ">
                 {type === 'edit' ? 'Add New Column' : 'Add New Board'}
            </button>

            {
                isBoardModalOpen && <AddEditBoardModal type={type} setBoardModalOpen={setIsBoardModalOpen}/>
            }
        </div>
    )
}
export default EmptyBoard