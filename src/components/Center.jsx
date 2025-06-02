import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import SideBar from "./SideBar"
import Column from "./Column"
const Center=({boardModalOpen,setBoardModalOpen})=>{
    const [windowSize,setWindowSize]=useState([
        window.innerWidth , window.innerHeight
    ])
    const [isSideBarOpen,setIsSideBarOpen]=useState(true)
    useEffect(()=>{
        const handleWindowSize=()=>{
            setWindowSize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize',handleWindowSize)
        return ()=>{
            window.removeEventListener('resize',handleWindowSize)
        }
    })
    const boards=useSelector((state)=>state.boards);
    const board=boards.find((board)=>board.isActive);
    const columns=board.columns
    return(
        <div className={windowSize[0]>=768 && isSideBarOpen ? 'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]' :

        'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6' }>
            
            {
                windowSize[0] >= 768 && (
                    <SideBar/>
                )
            }
            {
                columns.map((col,index)=>{
                     return <Column key={index} colIndex={index}/>
                })
            }

        </div>
    )
}

export default Center