import { ArrowLeft, Ellipsis, Settings, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetNotifications from '../hooks/useGetNotifications'
import NotificationCard from './NotificationCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { NOTIFICATION_API_END_POINT } from '../utils/Constant'
import { getRefresh } from '../redux/NotificationSlice'
import toast from 'react-hot-toast'

const Notifications = () => {
  const navigate  = useNavigate()
  const {notifications} = useSelector(store=>store.notification)
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  useGetNotifications();

  const deleteAllNotificationHandler = async() => {
        try {
          const res = await axios.delete(`${NOTIFICATION_API_END_POINT}/deletenotifications`,{
            withCredentials: true, 
          })
          dispatch(getRefresh());
          toast.success(res.data.message);
        } catch (error) {
          console.log("deleteAllNotificationHandler error: ", error)
        }
  }

  return (
    <div className='w-[46%]'>
        <div className='w-full p-4 flex items-center justify-between border-b border-gray-800'>

          <div className='flex gap-4 items-center'>
              <button onClick={()=>navigate(-1)}>
                  <ArrowLeft/>
              </button>
              <h1 className='text-2xl font-semibold'>Notofications</h1>
          </div>

          <div className="dropdown dropdown-end ">
                <button className=""><Settings width={25} /></button>
                <ul className="w-fit relative top-0 menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow">
                    
                    <li>
                        <button
                            onClick={deleteAllNotificationHandler}
                            > 
                                { isLoading ? (
                                    <div className='flex gap-2 items-center text-red-600 font-semibold'>
                                        <Trash2 width={16} color='red' /> Deleting...
                                    </div>
                                ) : (
                                    <div className='w-fit flex gap-2 items-center text-red-600 font-semibold'>
                                        <Trash2 width={16} color='red' /> Delete&nbsp;All&nbsp;Notifications
                                    </div>
                                )}

                        </button>
                    </li>
                        
                </ul>

            </div>
        </div>
        {
          notifications?.map((notification) => <div key={notification._id}> <NotificationCard notification={notification}/> </div>)
        }
    </div>
  )
}

export default Notifications