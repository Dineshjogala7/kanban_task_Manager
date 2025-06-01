import logo from '../assets/logo-mobile.svg'
import iconDown from '../assets/icon-chevron-down.svg'
import iconUp from '../assets/icon-chevron-up.svg'
import elips from '../assets/icon-vertical-ellipsis.svg'
import HeaderDropdown from './HeaderDropdown'
import ElipsMenu from './ElipsMenu'
import { useState } from 'react'
import AddEditBoardModal from '../modals/AddEditBoardModal'
import { useSelector,useDispatch } from 'react-redux'
import AddEditTaskModal from '../modals/AddEditTaskModal'
import DeleteModal from '../modals/DeleteModal'
import boardSlice from '../redux/boardSlice'
const Header=({boardModalOpen,setBoardModalOpen})=>{
    const dispatch=useDispatch()
    const [openDropdown,setOpenDropdown]=useState(false);
    const [openAddEditTaskModal,setOpenAddEditTaskModal]=useState(false);
    const [boardType,setBoardType]=useState("add");
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false)
    const boards=useSelector((state)=>state.boards);
    const board=boards.find((board)=>board.isActive);
    const [isElipsOpen,setElipsOpen]=useState(false);
    const setOpenEditModal=()=>{
        setBoardModalOpen(true);
        setElipsOpen(false)
    }
    const setOpenDeleteModal=()=>{
        setIsDeleteModalOpen(true);
        setElipsOpen(false)
    }
    const onDeleteBtnClick=()=>{
        dispatch(boardSlice.actions.deleteBoard());
        dispatch(boardSlice.actions.setBoardActive({index:0}))
        set(false)
    }
    return(
        <div className='p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0'> 
            
            <header className='flex justify-between items-center dark:text-white'>
                {/* left side */}
                <div className='flex items-center space-x-2 md:space-x-4'>
                    <img src={logo} alt="logo" className='h-6 w-6'/>
                    <h3 className='hidden md:inline-block font-sans font-bold md:text-4xl'>
                        KANBAN
                    </h3>
                    <div className='flex items-center'>
                        <h3 className='truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans'>
                            {board?.name}
                        </h3>
                        <img src={openDropdown ? iconUp : iconDown} alt="dropdown"  className='md:hidden w-3 ml-2 cursor-pointer' onClick={()=>setOpenDropdown(!openDropdown)}/>
                    </div>
                </div>

                {/* rightside */}

                <div className='flex items-center space-x-4 md:space-x-6'>
                    <button className='button hidden md:block'  onClick={()=>setOpenAddEditTaskModal(true)}>
                        + Add New Task
                    </button>
                    <button className='button py-1 px-3 md:hidden' onClick={()=>setOpenAddEditTaskModal(true)}>+</button>
                    <img src={elips} alt="elips" className='cursor-pointer h-6' onClick={()=>{
                        setBoardType('edit');
                        setOpenDropdown(false)
                        setElipsOpen((state)=>!state)
                    }}/>
                    {isElipsOpen && <ElipsMenu type='Boards' setOpenEditModal={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal}/>}
                </div>

            </header>

            {openDropdown && <HeaderDropdown setOpenDropdown={setOpenDropdown} setBoardModalOpen={setBoardModalOpen}/>}
            {boardModalOpen && <AddEditBoardModal setBoardModalOpen={setBoardModalOpen} type={boardType} setBoardType={setBoardType} />}
            {openAddEditTaskModal && <AddEditTaskModal setOpenAddEditTaskModal={setOpenAddEditTaskModal} device={'mobile'} type={'add'}/>}
            {isDeleteModalOpen && <DeleteModal type={boardType} title={board.name} setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick}/>}
        </div>
    )
}
export default Header