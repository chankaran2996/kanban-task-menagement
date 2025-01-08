import { shuffle } from 'lodash'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Task from './Task'

const Colum = ({colIndex}) => {
    const colors =[
        'bg-red-500',
        'bg-Orange-500',
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-indigo-500',
        'bg-yellow-500',
        'bg-pink-500',
        'bg-sky-500'
    ]

    const [color, setColor] = useState(null)

    const dispatch = useDispatch()

    const boards = useSelector(state => state.boards)
    const board = boards.find(board => board.isActive)
    // console.log(board , colIndex)
    // if(board.colum){
        const col = board.colums.find((col, i) => i=== colIndex)
        // console.log(col)
    // }else{
        // const col = board.Columns.find((col, i) => i=== colIndex)
    // }

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [dispatch])

  return (
    <div className='scrollbar-hide mx-5 pt-[90px] min-w-[280px]'>
        <p className='font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]'>
            <div className={`rounded-full w-4 h-4 ${color}`}>
                {col.name} ({col.task.length})
            </div>
        </p>

        {
            col.task.map((task, i) => {
                return (<Task key={i} taskIndex={i} colIndex={colIndex}/>)
            })
        }
      
    </div>
  )
}

export default Colum
