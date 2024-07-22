import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useGetNotifications from '../hooks/useGetNotifications'
import NotificationCard from './NotificationCard'
import { useSelector } from 'react-redux'

const Notifications = () => {
  const navigate  = useNavigate()
  const {notifications} = useSelector(store=>store.notification)

  useGetNotifications();

  return (
    <div className='w-[46%]'>
        <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
            <button onClick={()=>navigate(-1)}>
                <ArrowLeft/>
            </button>
            <h1 className='text-2xl font-semibold'>Notofications</h1>
        </div>
        {
          notifications?.map((notification) => <div key={notification._id}> <NotificationCard notification={notification}/> </div>)
        }
    </div>
  )
}

export default Notifications