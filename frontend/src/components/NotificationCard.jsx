import { Ellipsis, EllipsisVertical, Link, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcLike } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { SlUserFollowing } from "react-icons/sl";
import axios from 'axios';
import { NOTIFICATION_API_END_POINT } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/NotificationSlice';
import toast from 'react-hot-toast';

const NotificationCard = ({ notification }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const deleteNotificationHandler = async(id) =>{
        setIsLoading(true)
        try {
            const res = await axios.delete(`${NOTIFICATION_API_END_POINT}/deletenotification/${id}`, {
                withCredentials: true, 
            })
            dispatch(getRefresh());
            toast.success(res.data.message)
        } catch (error) {
            console.log("deleteNotificationHandler error: ", error)
        } finally{
            setIsLoading(false)
        }
    }

    

    return (
        <div className='w-full flex justify-between px-4 hover:bg-gray-400 border-b border-gray-800 hover:bg-opacity-10'>
            {/* Like Notification */}
            <div className='w-[95%]'>
                {
                    notification.type === 'like' && (
                        <div className='w-full  flex justify-between items-center py-2'>
                            <div className='w-[90%] min-h-14 flex items-center gap-1' >
                                <div className='font-semibold flex items-center gap-2 cursor-pointer'>
                                    <div onClick={() => navigate(`/post/${notification.post?._id}`)} >
                                        < FcLike size={30} />
                                    </div>
                                    <div onClick={() => navigate(`/profile/${notification.from._id}`)} className='text-sm font-semibold'>
                                        {notification.from.username}
                                    </div>
                                </div>

                                <div
                                    onClick={() => navigate(`/post/${notification.post?._id}`)}
                                    className='flex items-center text-gray-400 text-sm cursor-pointer'>liked&nbsp;your&nbsp;post.
                                </div>

                                {
                                    notification?.post?.text && (
                                        <div
                                            onClick={() => navigate(`/post/${notification.post?._id}`)}
                                            className='h-5 overflow-hidden truncate text-sm text-gray-400 cursor-pointer'> "{notification?.post?.text}" </div>
                                    )
                                }
                            </div>

                            {
                                notification?.post?.img && (
                                    <img
                                        onClick={() => navigate(`/post/${notification.post._id}`)}
                                        src={notification?.post?.img}
                                        className='cursor-pointer h-12 w-12 object-cover rounded-md'
                                    />
                                )
                            }

                        </div>)
                }


                {/* Comment Notification */}
                {
                    notification.type === 'comment' && (
                        <div className='flex justify-between items-center py-2'>
                            <div className='w-[90%] min-h-14 flex items-center gap-1' >
                                <div className='font-semibold flex items-center gap-2 cursor-pointer'>
                                    <div onClick={() => navigate(`/post/${notification.post?._id}`)} >
                                        < FaCommentDots size={30} />
                                    </div>
                                    <div onClick={() => navigate(`/profile/${notification.from._id}`)} className='text-sm font-semibold'>
                                        {notification.from.username}
                                    </div>
                                </div>

                                <div
                                    onClick={() => navigate(`/post/${notification.post?._id}`)}
                                    className='flex items-center text-gray-400 text-sm cursor-pointer'>commented&nbsp;on&nbsp;your&nbsp;post.
                                </div>

                                <div
                                    onClick={() => navigate(`/post/${notification.post?._id}`)}
                                    className='h-5 overflow-hidden text-sm text-gray-400 cursor-pointer flex'>
                                    Tap&nbsp;to&nbsp;see.&nbsp;
                                    <div className='w-fit'> < FaCommentDots size={13} /> </div>
                                    &nbsp;<div className='truncate text-gray-400'>"{notification?.commentText}"</div>
                                </div>
                            </div>

                            {
                                notification?.post?.img && (
                                    <img
                                        onClick={() => navigate(`/post/${notification._id}`)}
                                        src={notification?.post?.img}
                                        className='cursor-pointer h-12 w-12 object-cover rounded-md'
                                    />
                                )
                            }

                        </div>)
                }


                {/* Follow Notification */}
                {
                    notification.type === 'follow' && (
                        <div className='flex justify-between items-center py-2'>
                            <div className='w-[90%] min-h-14 flex items-center gap-1' >
                                <div className='font-semibold flex items-center gap-2 cursor-pointer'>
                                    <div onClick={() => navigate(`/profile/${notification.from._id}`)} >
                                        < SlUserFollowing size={30} />
                                    </div>
                                    <div onClick={() => navigate(`/profile/${notification.from._id}`)} className='text-sm font-semibold'>
                                        {notification.from.username}
                                    </div>
                                </div>

                                <div
                                    onClick={() => navigate(`/post/${notification.post?._id}`)}
                                    className='flex items-center text-gray-400 text-sm cursor-pointer'>started&nbsp;following&nbsp;you
                                </div>

                            </div>
                        </div>)
                }

            </div>

            <div className="dropdown dropdown-end ">
                <button className=""><Ellipsis width={15} color='gray' /></button>
                <ul className="relative top-0 menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    
                    <li>
                        <button
                            onClick={() => deleteNotificationHandler(notification._id)}
                            > 
                                { isLoading ? (
                                    <div className='flex gap-2 items-center text-red-600 font-semibold'>
                                        <Trash2 width={16} color='red' /> Deleting...
                                    </div>
                                ) : (
                                    <div className='flex gap-2 items-center text-red-600 font-semibold'>
                                        <Trash2 width={16} color='red' /> Delete
                                    </div>
                                )}

                        </button>
                    </li>
                        
                </ul>

            </div>

        </div>
    )
}

export default NotificationCard


















