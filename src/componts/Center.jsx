import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'
import Colum from './Colum'

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

  return (
    <div className={
      windowSize[0] >= isSideBarOpen ?
      'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6 ml-[261px]':
      'bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-6'
    }>
      {
        windowSize[0] >= 768 && <SideBar/>
        
      }

      {
        columns.map((col , i) => {
          return (<Colum key={i} colIndex = {i} />)
        })
      }
    </div>
  )
}

export default Center
