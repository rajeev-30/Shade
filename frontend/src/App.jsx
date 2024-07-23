import { useState } from 'react'
import Body from './components/Body'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className='w-full'>
      <Body/>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
