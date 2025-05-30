import Header from "./components/Header";
import Center from "./components/Center";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardSlice from "./redux/boardSlice";
import EmptyBoard from "./components/EmptyBoard";
const App=()=>{
  const dispatch=useDispatch()
  const [boardModalOpen,setBoardModalOpen] = useState(false);
  const boards=useSelector((state)=>state.boards);
  const activeBoard=boards.find((board)=>board.isActive)
  if(!activeBoard && boards.length > 0){
    dispatch(boardSlice.actions.setBoardActive({index:0}))
  }
  return(
    <div className="overflow-hidden overflow-x-scroll">
        <div>
          {boards.length>0 ? <div>
              {/* header section */}
              <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
              
              {/* center section */}

              <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />


          </div>: <div> 
              <EmptyBoard type='add'/>
            </div>}
        </div>
    </div>
  )
}

export default App;