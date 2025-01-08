import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TaskModel from '../modals/TaskModel'

const Task = ({key, taskIndex, colIndex}) => {

    const boards = useSelector(state => state.boards)
    const board = boards.find(board => board.isActive)
    const columns = board.colums
    const col = columns.find((col,i) => i === colIndex)
    const task = col.task.find((task ,i) => i === taskIndex)

    const [isTaskModelOpen, setIsTaskodelOpen] = useState(false)
    // console.log("called")
    let compected = 0;
    let subTasks = task.subTasks
    subTasks.forEach((subtask) =>{
        if(subtask.isComplected){
            compected++;
        }
    })

    const openCloseTaskMdel = () => {
        setIsTaskodelOpen(true)
    }

  return (
    <div>
        <div onClick={openCloseTaskMdel} className='w-[200px] first:my-5 rounded-lg bg-white dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer' >
            <p className='font-bold tracking-wide'>
                {
                    task.title
                }
            </p>

            <p className='font-bold text-xs tracking-tighter mt-2 text-gray-500'>
                {compected } 0f {subTasks.length} complected tasks
            </p>
        </div>  

        { isTaskModelOpen && <TaskModel colIndex={colIndex} taskIndex={taskIndex} setIsTaskodelOpen={setIsTaskodelOpen} />}    
    </div>
  )
}

export default Task
