import { useEffect, useState } from "react"

const Center=({boardModalOpen,setBoardModalOpen})=>{
    const [windowSize,setWindowSize]=useState([
        window.innerWidth , window.innerHeight
    ])

    useEffect(()=>{
        const handleWindowSize=()=>{
            setWindowSize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize',handleWindowSize)
        return ()=>{
            window.removeEventListener('resize',handleWindowSize)
        }
    })
    return(
        <div>
            <p className="text-black">center hello</p>
        </div>
    )
}

export default Center