import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetuser from '../hooks/useGetuser'
import useGetallusers from '../hooks/useGetallusers'
import useGetprofile from '../hooks/useGetprofile'
import { useSelector } from 'react-redux'



const Home = () => {
  
  useGetuser();
  useGetallusers();

  return (
    <div className='h-full w-full flex'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar/>
    </div>

  )
}

export default Home