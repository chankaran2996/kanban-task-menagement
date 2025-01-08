import React, { useState } from 'react'
import { v4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg'
import { useDispatch, useSelector } from 'react-redux'
import boardsSlice from '../redux/boardsSlice'

const AddEditTaskModal = ({type , taskIndex, device, setOpenAddEditTask, setIsTaskodelOpen, pervColIndex = 0}) => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const [isValid , setIsValid] = useState(true)

    const [description, setDescription] = useState('')

    const [dudeDate, setDudeDate] = useState('')

    const [AssingTo, setAssingTo] = useState('')

    const [priority, setPriority] = useState('')

    const [newColIndex, setNewColIndex] = useState(pervColIndex)

    const [subTasks,setSubTasks] = useState(
        [
          {
            title : "",
            isCompleted:false,
            id:v4()
          },
          {
            title : "",
            isCompleted:false,
            id:v4()
          }
        ]
      )

      const board = useSelector((state) => state.boards).find((board) => board.isActive)

    //   console.log(board.colums)
      const columns = board.colums;

    //   const col = columns.find((col , i) => i=== pervColIndex)
      
      const [status, setStatus] = useState(columns[pervColIndex].name)
      
      const validate = () => {
        // console.log('v1clallled')
        setIsValid(false)
        // console.log('v2clallled')
        if(!title.trim()){
          return false
        }
        if(!AssingTo.trim()){
            return false
        }
        // console.log(subTasks)
        console.log(subTasks)
        for(let i=0;i<subTasks.length;i++){
          console.log(subTasks[i].title==false)
          if(!subTasks[i].title.trim()){
            return false
          }
        }
        // console.log('v3clallled')
        setIsValid(true)
        return true
      }

      const  subValue = (id, newValue) => {
        // console.log(subTasks)
        setSubTasks(
          (changing) => {
            const newState = [...changing]
            const colum = newState.find(col => col.id===id)
            colum.title = newValue
            return newState
          }
        )
      }

      const onChangeStatus = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
      }

      const onDelete = (id) => {
        // console.log(id,subTasks)
        setSubTasks(
          (changing) => changing.filter((i) => i.id !== id)
        )
      }

    const close = (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setOpenAddEditTask(false)
    }

    const  addSubTask= () =>{
          setSubTasks((state) => [...state,{
            title : "",
            isCompleted:false,
            id:v4()
          }])
    }

    const onSubmit = (type) => {
        console.log('clallled-data',subTasks)

        if(type==='add'){
            console.log(title,
                description,
                AssingTo,
                dudeDate,
                subTasks,
                priority,
                status,
                newColIndex)
          dispatch(boardsSlice.actions.addTask(
            {
                title,
                description,
                AssingTo,
                dudeDate,
                subTasks,
                priority,
                status,
                newColIndex

            }))
        }else{
          dispatch(
            boardsSlice.actions.editTask({
                title,
                description,
                AssingTo,
                dudeDate,
                subTasks,
                priority,
                status,
                taskIndex,
                pervColIndex,
                newColIndex
            })
          )
        }
      }
  return (
    <div onClick={close} className={
        device === 'mobile' ? 
        'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]' :
        'py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 top-0 bottom-0 bg-[#00000080]'
    }>
      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] dark:text-white text-black font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
            {type === 'edit' ? 'Edit ' : 'Add New '} Task
        </h3>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
                Task Name
            </label>
            <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Enter Task Name' className='bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' />
        </div>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
                Description
            </label>
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} type='text' placeholder='Enter your description' className='bg-transparent px-4 py-2 outline-none min-h-[200px] focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' />
        </div>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
            Assing To
            </label>
            <input onChange={(e) => setAssingTo(e.target.value)} value={AssingTo} type='text' placeholder='Need to assign' className='bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' />
        </div>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
                Due Date
            </label>
            <input onChange={(e) => setDudeDate(e.target.value)} value={dudeDate} type='date' className='bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' />
        </div>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
                Subtasks
            </label>
            {
                subTasks.map((val, i) => {
                    return (<div key={i} className='flex items-center w-full'>
                            <input type='text' onChange={(e)=>{subValue(val.id , e.target.value)}} value={val.title} className='bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]'/>
                            <img src={crossIcon} onClick={() => {onDelete(val.id)}} className='cursor-pointer m-4'/>
                          </div>)
                })
            }
        </div>

        <div>
        <button onClick={addSubTask} className='w-full items-center hover:opacity-75 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full mt-2'>
            + Add new column
        </button>
        </div>

        <div className='mt-8 flex flex-col space-y-1'>
            <label className='text-sm dark:text-white text-gray-500'>
                priority
            </label>
            <input onChange={(e) => setPriority(e.target.value)} value={priority} type='number' placeholder='Need to assign' className='bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0' />
        </div>

        <div className='mt-8 flex flex-col space-y-3'>
            <label className='text-sm dark:text-white text-gray-500'>
                Current status
            </label>
            <select value={status} onChange={onChangeStatus} className='select-status dark:bg-black dark:text-white text-gray-500 flex flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none'>
                {
                    columns.map((column,i) =>{
                        return(
                            <option value={column.name} key={i}>
                                {column.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
        <div>
        <button 
            onClick={
              () => { 
                const isValid = validate()
                // console.log('checkclallled',isValid)
                if(isValid===true){
                  onSubmit(type)
                  setOpenAddEditTask(false)
                }
              }
            } 
            className='w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full'>
            {type === 'edit' ? 'Save Edit' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditTaskModal
