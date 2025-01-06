import React, { useState } from 'react'
import { v4, validate } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch } from 'react-redux'
import boardsSlice from '../redux/boardsSlice'
 

const AddEditBoardModel = ({setBoardModelOpen, type }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [isValid , setIsValid] = useState(false)

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

    const onDelete = (id) => {
      setBoardColumn(
        (changing) => changing.filter((i) => i.id !== id)
      )
    }

    const addColumn = () =>{
      setBoardColumn((state) => [...state,{name : '',task:[],id:v4()}])
    }

    const validate = () => {
      // console.log('v1clallled')
      setIsValid(false)
      // console.log('v2clallled')
      if(!name.trim()){
        return false
      }
      for(let i=0;i<boardColumn.length;i++){
        if(!boardColumn[i].name.trim()){
          return false
        }
      }
      // console.log('v3clallled')
      setIsValid(true)
      return true
    }

    const onSubmit = (type) => {
      // console.log('clallled')
      if(type==='add'){
        dispatch(boardsSlice.actions.addBoard({name,boardColumn}))
      }else{
        dispatch(boardsSlice.actions.editBoard({name, boardColumn}))
      }
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
                <img src={crossIcon} onClick={() => {onDelete(colum.id)}} className='cursor-pointer m-4'/>
              </div>)
            })
          }
        </div>

        <div>
          <button onClick={addColumn} className='w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full mt-2'>
            + Add new column
          </button>
          
          <button 
            onClick={
              () => { 
                const isValid = validate()
                // console.log('checkclallled',isValid)
                if(isValid===true){
                  onSubmit(type)
                  setBoardModelOpen(false)
                }
              }
            } 
            className='w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'>
            {type === 'add' ? 'Create New Board' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditBoardModel
