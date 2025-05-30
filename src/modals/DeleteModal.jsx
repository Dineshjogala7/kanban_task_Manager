const DeleteModal=({type,title,onDeleteBtnClick,setIsDeleteModalOpen})=>{
    return(
        <div onClick={(e)=>{
            if(e.target===e.currentTarget) setIsDeleteModalOpen(false)
            else{
                return ;
            }
        }} className="fixed right-0 bottom-[0] left-0 top-0 px-2 py4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]">
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white  max-w-md w-full py-8 px-8 rounded-xl">
                <h3 className="font-bold text-red-500 text-xl">
                    Delete This {type}
                </h3>
                {
                    type==='task' ? (
                        <p className="text-gray-500 font-semibold tracking-wider text-sm pt-6 "> Are You sure you wantto delete the "{title}" task and its sbtasks ? This action cannot be reversed</p>
                    ):(<p className="text-gray-500 font-semibold tracking-wider text-sm pt-6 ">
                            Are You sure you want to Delete this "{title}" board ? Once Deletd You cannot Revert this back
                    </p>)
                }
                <div className="flex items-center justify-between mt-4  w-full space-x-6">
                     <button onClick={onDeleteBtnClick} className=" w-full py-2 px-4 bg-red-500 rounded-full text-sm font-bold hover:opacity-75 text-white">DELETE</button>
                     <button onClick={()=>setIsDeleteModalOpen(false)} className="w-full py-2 px-4 bg-gray-300  rounded-full text-sm font-bold hover:opacity-75 dark:bg-white dark:text-gray-500">CANCEL</button>
                </div>
            </div>
        </div>
    )
}
export default DeleteModal