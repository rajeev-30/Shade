import React  from 'react'
import LeftSidebar from '../components/Common/LeftSidebar'
import { Outlet } from 'react-router-dom'
import RightSidebar from '../components/Common/RightSidebar'
import useGetuser from '../hooks/useGetuser'
import useGetallusers from '../hooks/useGetallusers'
import useScrollPosition from '../hooks/useScrollPosition'



const Home = () => {
  
  useGetuser();
  useGetallusers();
  useScrollPosition();

  return (
    <div className='h-full w-full flex'>
        <LeftSidebar/>
        <Outlet/>
        <RightSidebar/>
    </div>

  )
}

export default Home