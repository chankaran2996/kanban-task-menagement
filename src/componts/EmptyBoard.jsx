import React, { useState } from 'react'
import AddEditBoardModel from '../modals/AddEditBoardModel'

const EmptyBoard = ({type}) => {
    const [isBoardModelOpen, setIsBoardModelOpen] = useState(false)

    const openAddBoard = () => {
        setIsBoardModelOpen(true)
    }
  return (
    <div className='bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center'>
      <h3 className='text-gray-500 font-bold'>
        {
            type === 'edit' ?
            'This board is empty. create a new column to get stacted' :
            'There are no boards available. create a new column to get stacted'
        }
      </h3>
      <button onClick={openAddBoard} className='w-full items-center max-w-xs font-bold hover:opacity-75 dark:text-white dark:bg-[#635fc37] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'>
        {
            type === 'edit' ? "+Add New Column" : "+Add New Board"
        }
      </button>

      {
        isBoardModelOpen && (
            <AddEditBoardModel type={type} setBoardModelOpen={setIsBoardModelOpen}/>
        )
      }
    </div>
  )
}

export default EmptyBoard
