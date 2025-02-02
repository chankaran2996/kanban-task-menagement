import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import { Switch } from '@headlessui/react'
import UseDarkmode from '../Hooks/UseDarkmode'
import boardsSlice from '../redux/boardsSlice'

const HeaderDropdown = ({setOpenDrop , setBoardModelOpen}) => {
    const dispatch = useDispatch()
    const [colorTheme, setTheme] = UseDarkmode()
    const [darkSide, setDarkSide] = useState(
        colorTheme === 'light' ? true : false
    )

    const toggleDrackMode = (checked) => {
        setTheme(colorTheme)
        setDarkSide(checked)
    }

    const boards = useSelector((state) => state.boards)

    // console.log(boards)

    const createBoardDropdown = () => {
        setBoardModelOpen(true)
        setOpenDrop(false)
    }

    const close = (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setOpenDrop(false)
    }
  return (
    <div className='py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]' onClick={close}>
      <div className='bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a] w-full py-4 rounded-xl'>
        <h3 className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>
            All Boards ({boards?.length})
        </h3>
        <div>
            {
                boards.map((board , index) => {
                    return (<div onClick={()=>{dispatch(boardsSlice.actions.setBoardActive({index}))}} className={`flex items-baseline dark:text-white space-x-2 px-5 py-4 ${board.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`} key={index}>
                        <img src={boardIcon} className='h-4 '/>
                        <p className='text-lg font-bold'>
                            {board.name}
                        </p>
                    </div>)
                })
            }
        </div>

        <div onClick={createBoardDropdown} className='cursor-pointer flex items-baseline space-x-2 text-[#635fc7] px-5 py-4'>
            <img src={boardIcon} className='h-4' />
            <p className='text-lg font-bold'>
                create New Board 
            </p>
        </div>

        <div className='mx-2 p-4 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg'>
            <img src={lightIcon} />
            <Switch checked={darkSide} onChange={toggleDrackMode} className={`${darkSide ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                <span className={`${darkSide ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}/>
            </Switch>
            <img src={darkIcon} />
        </div>
      </div>
    </div>
  )
}

export default HeaderDropdown
