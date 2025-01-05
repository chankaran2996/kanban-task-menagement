import React, { useState } from 'react'
import { v4 } from 'uuid'

const AddEditBoardModel = ({setBoardModelOpen, type }) => {
  const [name, setName] = useState('')

  const [boardColumn,setBoardColumn] = useState(
    [
      {
        name : "Todo",
        task:[],
        id:v4()
      },
      {
        name : "Todo6",
        task:[],
        id:v4()
      }
    ]
  )

    const close = (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setBoardModelOpen(false)
    }

    const inputChange = (e) => {
      setName(e.target.value)
    }

    const boardColumnNameChange = (id, newValue) => {
      setBoardColumn(
        (changing) => {
          const newState = [...changing]
          const colum = newState.find(col => col.id===id)
          colum.name = newValue
          return newState
        }
      )
    }
  return (
    <div onClick={close} className='fixed scrollbar-hide right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]'>
      <div className='scrollbar-hide overflow-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
            {
                type === 'edit' ? 'Edit ' : 'Add New '
            }Board
        </h3>

        <div className='mt-8 flex flex-col space-y-3'>
            <label className='text-sm dark:text-white text-gray-500'>
              Board Name
            </label>
            <input onChange={inputChange} id='board-name-input' placeholder='enter your text' value={name} className='bg-transparent outline-none px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0'/>
        </div>

        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Board Columns
          </label>
          {
            boardColumn.map((colum, i) => {
              return (<div key={i} className='flex items-center w-full'>
                <input type='text' onChange={(e)=>{boardColumnNameChange(colum.id , e.target.value)}} value={colum.name} className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]'/>
              </div>)
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AddEditBoardModel
