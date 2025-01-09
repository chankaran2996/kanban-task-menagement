import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UseDarkmode from '../Hooks/UseDarkmode'
import boardsSlice from '../redux/boardsSlice'
import boardIcon from '../assets/icon-board.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import darkIcon from '../assets/icon-dark-theme.svg'
import { Switch } from '@headlessui/react'

const SideBar = ({isSideBarOpen, setIsSideBarOpen}) => {
  const dispatch = useDispatch()
  const [colorTheme, setTheme] = UseDarkmode()
  const [darkSide, setDarkSide] = useState(
      colorTheme === 'light' ? true : false
  )

  const [boardModelOpen,setBoardModelOpen] = useState(false)

  const createBoardDropdown = () => {
    setBoardModelOpen(true)
}

  const toggleDrackMode = (checked) => {
      setTheme(colorTheme)
      setDarkSide(checked)
  }

  

  const choseBoard = (i) => {
    dispatch(boardsSlice.actions.setBoardActive({i}))
  }

  const boards = useSelector((state) => state.boards)

  return (
    <div>
      <div className={
        isSideBarOpen ? 'min-w-[72px] bg-white dark:bg-[#2b2c37] fixed top-[72px] h-screen items-center left-0 z-20':
        'bg-[#635fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-75 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full'
      }>

        <div>
          {
            isSideBarOpen && (
              <div className='bg-white dark:bg-[#2b2c37] w-full py-4 rounded-xl'>
                <h3 className='dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8'>
                  ALL BOARDS {(boards.length)}
                </h3>
                <div className='flex flex-col h-[70vh] justify-between'>
                  <div>
                    {
                      boards.map((board, i) => {
                        return (<div key={i} onClick={()=>{choseBoard(i)}} className={`flex items-baseline space-x-2 pc-5 mr-8 roungded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"} `}>
                          <img src={boardIcon} className='h-4'/>
                          <p className='text-lg font-bold'>
                            {board.name}
                          </p>
                        </div>)
                      })
                    }
                    <div onClick={createBoardDropdown} className='cursor-pointer flex items-baseline space-x-2 text-[#635fc7] px-5 py-4'>
                              <img src={boardIcon} className='h-4' />
                              <p className='text-lg font-bold'>
                                  create New Board 
                              </p>
                          </div>

                          {boardModelOpen && <AddEditBoardModel type='Add' setBoardModelOpen={setBoardModelOpen}/>}
                  
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

        </div>

      </div>
    </div>
  )
}

export default SideBar
