import {useSelector} from 'react-redux'
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import {Switch} from '@headlessui/react'
import useDarkMode from '../Hooks/useDarkMode'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import boardSlice from '../redux/boardSlice'
const HeaderDropdown=({setOpenDropdown,setBoardModalOpen})=>{

    const boards=useSelector((state)=>state.boards)
    const [theme,setTheme]=useDarkMode()
    const [darkSide,setDarkSide]=useState(
        theme==='dark'? true :false
    )
    const toggleDarkMode=(checked)=>{
        setTheme(checked ? 'dark' : 'light')
        setDarkSide(checked)
    }
    const dispatch=useDispatch()
    return(
        <div className=" py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-[4.2rem]  bg-[#00000080]"
            onClick={(e)=>{
                if(e.target === e.currentTarget){
                    setOpenDropdown(false)
                }
                return
            }}
        >
            {/* dropdown modal */}
            <div className="bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl">
                <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8">
                    All Boards {boards?.length}
                </h3>
                <div>
                    {
                        boards.map((board,index)=>(
                            <div className={` cursor-pointer flex items-baseline dark:text-white space-x-2 px-5 py-4 ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`} key={index}
                            onClick={()=>dispatch(boardSlice.actions.setBoardActive({index}))} > 
                                <img src={boardIcon} alt="boardicon" className='h-4' />
                                <p className='text-lg font-bold'>{board.name}</p>
                            </div>
                        ))
                    }
                    <div className='flex items-baseline space-x-2 py-4 px-5 text-[#635fc7]'>
                        <img src={boardIcon} alt="boardIcon" className='h-4' />
                        <p className='text-lg font-bold cursor-pointer' onClick={()=>{setBoardModalOpen(true)
                          setOpenDropdown(false)
                        }
                        }> Create New Board</p>
                    </div>
                    <div className='mx-2  p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
                        <img src={lightIcon} alt="lightIcon" />
                        <Switch checked={darkSide} onChange={toggleDarkMode} className={` ${darkSide ? 'bg-[#635fc5]': 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                            <span className={`${darkSide ? 'translate-x-6':'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}></span>
                        </Switch>
                        <img src={darkIcon} alt="darkIcon" />
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default HeaderDropdown