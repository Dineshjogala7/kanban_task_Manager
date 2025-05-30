import { Delete } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import boardSlice from "../redux/boardSlice";

const AddEditBoardModal=({setBoardModalOpen,type,setBoardType})=>{
    const [name,setName]=useState("");
    const dispatch=useDispatch();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isValid,setIsValid]=useState(true)
    const board=useSelector((state)=>{
        return state.boards;
    }).find((board)=>board.isActive)
    
    const [newColumn,setNewColumn]=useState(
        [
            {name : 'Todo' , task : [], id:uuidv4()} ,
            {name : 'Doing' , task : [], id:uuidv4()},
        ]
    )

    // Use useEffect to handle initialization for edit mode
    useEffect(() => {
        if(type === 'edit' && board && isFirstLoad) {
            // Check if board has columns property (could be 'columns' instead of 'column')
            const boardColumns = board.columns || board.column || [];
            setNewColumn(
                boardColumns.map((col) => {
                    return {...col, id: uuidv4()}
                })
            );
            setName(board.name || "");
             setIsFirstLoad(false);
        }
    }, [type, board]);

    const onChange=(id,newValue)=>{
        setNewColumn((prevstate)=>{
            const newState=[...prevstate]
            const column=newState.find((col)=>col.id===id);
            if(column) {
                column.name=newValue
            }
            return newState
        })
    }

    const onDelete=(id)=>{
        setNewColumn((prevstate)=>{
            const newState=prevstate.filter((col)=>col.id!==id);
            return newState
        })
    }

    const Validate=()=>{
        setIsValid(false);
        if(!name.trim()){
            return false
        }
        for(let i=0;i<newColumn.length;i++){
            if(!newColumn[i].name.trim()){
                return false
            }
        }
        setIsValid(true)
        return true
    }

    const onSubmit=(type)=>{
        setBoardModalOpen(false);
        if(type==='add'){
            dispatch(boardSlice.actions.addBoard(
                {name,newColumn}
            ))
        }
        else{
            dispatch(boardSlice.actions.editBoard({name,newColumn}))
        }
        setBoardType('add');
    }

    return(
        <div onClick={(e)=>{
            if(e.target===e.currentTarget){
                setBoardModalOpen(false);
            }
            else{
                return;
            }
        }} className="left-0 right-0 top-0 bottom-0 fixed overflow-scroll px-2 py-4 scrollbar-hide z-50
         justify-center items-center flex flex-col bg-[#00000080]">

           
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2B2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e] max-w-md w-full px-8 py-8 rounded-xl">
                <h3 className="text-lg">
                    {type==='edit'? 'Edit':'Add New'} Board
                </h3>
                <div className="mt-8 flex flex-col space-y-3  "> 
                <label className="text-sm dark:text-white text-gray-500">
                    Board Name
                </label>
                <input placeholder="e.g Web Design" id='board-name-input' onChange={(e)=>setName(e.target.value)} value={name} className="bg-transparent px-4 py-2  outline-none rounded-md text-sm border border-gray-600 focus:outline-[#635fc7]  outline-1 ring-0"/>

                </div>
                <div className="flex flex-col mt-8 space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">
                        Board Columns
                    </label>
                    {
                        newColumn.map((column,index)=>(
                            <div key={index} className="flex items-center w-full">
                                <input onChange={(e)=>{
                                    onChange(column.id,e.target.value)
                                }}  type="text" value={column.name} className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"/>
                                <Delete className="m-2 cursor-pointer" onClick={()=>onDelete(column.id)}/>
                                
                            </div>
                        ))
                    }

                </div>
                <div>
                    <button className="w-full items-center hover:opacity-25 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full mt-4" onClick={()=>{
                        setNewColumn((state)=>[...state,{name : 'Todo' , task : [], id:uuidv4()},])
                    }}>+ Add New Column</button>
                    <button className="w-full items-center hover:opacity-25 dark:bg-[#635fc7] dark:text-white text-[#635fc7] py-2 rounded-full mt-4" onClick={()=>{
                        const isValid=Validate()
                        if(isValid===true) onSubmit(type)
                    }}>{ type==='add'? 'Create New Board' : 'Save Changes'}</button>
                </div>
            </div>
        </div>
    )
}

export default AddEditBoardModal