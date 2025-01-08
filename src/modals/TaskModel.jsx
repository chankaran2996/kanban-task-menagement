import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import elipsis from '../assets/icon-vertical-ellipsis.svg'
import ElipsisMenu from '../componts/ElipsisMenu'
import Subtask from '../componts/Subtask'
import boardsSlice from '../redux/boardsSlice'
import DeleteModal from './DeleteModal'
import AddEditTaskModal from './AddEditTaskModal'
import AddEditBoardModel from './AddEditBoardModel'

const TaskModel = ({colIndex, taskIndex, setIsTaskodelOpen}) => {
  const dispatch = useDispatch()

  const boards = useSelector(state => state.boards )
  const board = boards.find(board => board.isActive )
  const columns = board.colums
  const col = columns.find((column, i) => colIndex === i )
  const task = col.task.find((col,i) => taskIndex ===i)
  const subTasks = task.subTasks
  let compected = 0;
    subTasks.forEach((subtask) =>{
        if(subtask.isComplected){
            compected++;
        }
    })

  const [status, setStatus] = useState(task.status)

  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))

  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false)

  const [isOpenDeleteModelOpen, setIsDeleteModalOpen] = useState(false)

  const [openAddEditTask,setOpenAddEditTask] = useState(false)

  const setOpenEditModel = () => {
    setOpenAddEditTask(true)
    setElipsisMenuOpen(false)
  }

  const setOpenDeleteModel = () => {
    setElipsisMenuOpen(false)
    setIsDeleteModalOpen(true)
  }

  const onChangeStatus = (e) =>{
    setStatus(e.target.value)
    setNewColIndex(e.target.selectedIndex)
  }

  const elipsisMenu = () => {
    setElipsisMenuOpen(state => !state)
  }

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteTask({taskIndex, colIndex}))
    setIsTaskodelOpen(false)
    setIsDeleteModalOpen(false)
}

  const close = (e) => {
    if(e.target !== e.currentTarget){
        return
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,colIndex,newColIndex,status
      })
    )
    setIsTaskodelOpen(false)
  }

  return (
    <div onClick={close} className='fixed right-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 bottom-0 justify-center items-center flex bg-[#00000080]'>
      <div className='scrollbar-hide overflow-y-scroll max-h--[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <div className='relative flex justify-between w-full items-center '>
          <h1 className='text-lg '>
            {task.title}
          </h1>
          <img src={elipsis} onClick={elipsisMenu} className='cursor-pointer h-6 '/>

          {
            elipsisMenuOpen && <ElipsisMenu type='task' setOpenEditModel = {setOpenEditModel} setOpenDeleteModel={setOpenDeleteModel} />
          }
        </div>

        <p className='text-gray-500 font-semibold tracking-wide text-sm pt-6'>
          {task.description}
        </p>

        <p className='pt-6 text-gray-500 tracking-widest text-sm '>
          Subtasks ({compected} of {subTasks.length})
        </p>

        <div className='mt-3 space-y-2'>
          {
            subTasks.map((subtask , i) => {
              return(
                <Subtask index={i} taskIndex={taskIndex} colIndex={colIndex} key={i} />
              )
            })
          }
        </div>

        <div className='mt-8 flex flex-col space-y-3'>
          <label className='text-sm dark:text-white text-gray-500'>
            Current Status
          </label>

          <select onChange={onChangeStatus} value={status} className='select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none'>
            {
              columns.map((column, i) => (
                <option className='status-option'>
                  {column.name}
                </option>
              ))
            }
          </select>
        </div>
      </div>
            {
              isOpenDeleteModelOpen && <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} onDeleteBtnClick={onDeleteBtnClick} title={task.title} type={'task'}/>
            }

            {
              openAddEditTask && <AddEditTaskModal setOpenAddEditTask ={setOpenAddEditTask} type='edit' taskIndex={taskIndex} pervColIndex = {colIndex}  setIsTaskodelOpen={setIsTaskodelOpen} />
            }

    </div>
  )
}

export default TaskModel
