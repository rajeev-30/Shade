import React from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'

const Home = () => {
  return (
    <div className='w-full flex'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar/>
    </div>

  )
}

export default Home