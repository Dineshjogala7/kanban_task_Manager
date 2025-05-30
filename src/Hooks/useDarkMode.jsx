import  { useEffect, useState } from "react";

function useDarkMode(){
    const [theme, setTheme] = useState(()=>{
        const stored=localStorage.getItem('theme')
        return stored || 'light'
    })
    

    useEffect(()=>{
        const root=window.document.documentElement
        root.classList.remove('dark','light')
        root.classList.add(theme)
        localStorage.setItem("theme",theme)
    },[theme])
    return [theme,setTheme]


}   

export default useDarkMode;