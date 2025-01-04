import React from 'react'

const AddEditBoardModel = ({setBoardModelOpen}) => {
    const close = (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setBoardModelOpen(false)
    }
  return (
    <div onClick={close} className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]'>
      Check
    </div>
  )
}

export default AddEditBoardModel
