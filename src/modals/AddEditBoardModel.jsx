import React from 'react'

const AddEditBoardModel = ({setBoardModelOpen}) => {
    const close = (e) => {
        if(e.target !== e.currentTarget){
            return
        }
        setBoardModelOpen(false)
    }
  return (
    <div onClick={close} className='fixed scrollbar-hide right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080]'>
      <div className='scrollbar-hide overflow-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
        <h3 className='text-lg'>
            {
                type === 'edit' ? 'Edit' : 'Add New'
            }Board Name
        </h3>

        <div className='mt-8 flex flex-col space-y-3'>
            <label className='text-sm dark:text-white text-gray-500'>
                Board Columns
            </label>
        </div>
      </div>
    </div>
  )
}

export default AddEditBoardModel
