import { Link } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotificationCard = ({notification}) => {
    const navigate = useNavigate();
  return (
    <div className='w-full px-4 hover:bg-gray-800 bordoer-b border-gray-800'>
        {
            notification.type==='like' && ( <div className='flex justify-between items-center'>
                <p className='py-5 cursor-pointer' >
                    <span className='font-semibold' 
                        onClick={()=>navigate(`/profile/${notification.from._id}`)}> 
                        {notification.from.username} 
                    </span> 
                    <span
                        onClick={()=>navigate(`/post/${notification.post._id}`)} 
                        className='text-gray-400 text-sm'> liked your post. 
                    </span>
                    {
                        notification?.post?.text && (
                            <span
                                onClick={()=>navigate(`/post/${notification.post._id}`)}  
                                className='text-sm text-gray-400'> "{notification?.post?.text}" </span>
                        )
                    }
                </p>

                <img
                    onClick={()=>navigate(`/post/${notification.post._id}`)}   
                    src={notification?.post?.img} 
                    className='cursor-pointer h-12 object-cover rounded-md'
                />

            </div>)
        }
    </div>
  )
}

export default NotificationCard