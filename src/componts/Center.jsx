import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'
import Colum from './Colum'
import AddEditBoardModel from '../modals/AddEditBoardModel'

const Center = ({boardModelOpen, setBoardModelOpen }) => {
  const [windowSize, setWindowSize] = useState(
    [
      window.innerWidth,
      window.InnerHeight
    ]
  )

  const [isSideBarOpen, setIsSideBarOpen] = useState(true)

  const boards = useSelector((state) => state.boards)
  const board = boards.find((board) => board.isActive === true)

  console.log(board)
  // if(board.Colums){
    const columns = board.colums
    // console.log(columns)
  // }
  // else{
  //   const columns = board.columns
  // }
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize",handleWindowResize)

    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

 

  const openBoard = () => {
    setBoardModelOpen(true)
  }

  return (
    <div  className={
      windowSize[0] >= isSideBarOpen ?
      'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]':
      'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6'
    }>
      {
        windowSize[0] >= 768 && <SideBar isSideBarOpen = {isSideBarOpen} setIsSideBarOpen = {setIsSideBarOpen} />
        
      }

      {
        columns.length > 0 ? 
        (
        <>
          {
            columns.map((col , i) => {
              return (<Colum key={i} colIndex = {i} />)
            })
          }

          <div onClick={openBoard} className='h-screen dark:b-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635fc7] transition duration-300 cursor-pointer bg-[#e9effa] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg'>
            +New Column
          </div>
        </>
        ):
        (
        <>
        <EmptyBoard type='edit'/>
        </>
        )
      }
      {
        boardModelOpen && <AddEditBoardModel type='edit' setBoardModelOpen={setBoardModelOpen}/>
      }

      {/* {
        columns.map((col , i) => {
          return (<Colum key={i} colIndex = {i} />)
        })
      } */}
    </div>
  )
}

export default Center
