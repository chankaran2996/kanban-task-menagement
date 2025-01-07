import React, { useState } from 'react'
import Header from './componts/Header'
import Center from './componts/Center'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from './redux/boardsSlice'
import EmptyBoard from './componts/EmptyBoard'


const App = () => {
  const dispatch = useDispatch()

  const boards = useSelector((state) => state.boards)

  const activeBoard = boards.find((board) => board.isActive)

  if(!activeBoard && boards.lenght>0){
    dispatch(boardsSlice.actions.setBoardActive({index:0}))
  }

  const [boardModelOpen, setBoardModelOpen] = useState(false)
  return (
    <div className='overflow-hidden overflow-x-scroll'>
      {
        boards.length > 0 ?
        (<div>
            <Header boardModelOpen = {boardModelOpen} setBoardModelOpen = {setBoardModelOpen} />
            <Center boardModelOpen = {boardModelOpen} setBoardModelOpen = {setBoardModelOpen} />
        </div>) :
        (
          <div>
            <EmptyBoard type='add'/>
          </div>
        )
      }
      
    </div>
  )
}

export default App
