import React, { useState } from 'react'
import Header from './componts/Header'
import Center from './componts/Center'


const App = () => {
  const [boardModelOpen, setBoardModelOpen] = useState(false)
  return (
    <div >
      <Header boardModelOpen = {boardModelOpen} setBoardModelOpen = {setBoardModelOpen} />
      <Center/>
    </div>
  )
}

export default App
