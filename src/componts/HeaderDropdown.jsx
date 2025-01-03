import React from 'react'

const HeaderDropdown = ({setOpenDrop}) => {
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
            All Boards 
        </h3>
        <div>

        </div>
      </div>
    </div>
  )
}

export default HeaderDropdown
