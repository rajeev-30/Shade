import { Ellipsis, EllipsisVertical, Trash2, UserRoundMinus, UserRoundPlus, UserRoundX } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFollowAndUnFollow from '../hooks/useFollowAndUnFollow'
import axios from 'axios'
import { POST_API_END_POINT } from '../utils/Constant'
import toast from 'react-hot-toast'
import { getRefresh } from '../redux/postSlice'


const Comments = ({ comment, postId }) => {
    const {user} = useSelector(store=>store.user)
    const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false)
    const dispatch = useDispatch()

    const [followAndUnFollow, isLoading] = useFollowAndUnFollow();


    const deleteCommentHandler = async(postId,commentId) =>{
        setIsLoadingDeleteComment(true)
        try {
            const res = await axios.post(`${POST_API_END_POINT}/deletecomment/${postId}/${commentId}`,{},{
                withCredentials: true,
            })
            toast.success(res.data.message);
            dispatch(getRefresh());
        } catch (error) {
            console.log("deleteCommentHandler error: ",error)
        }finally{
            setIsLoadingDeleteComment(false)
        }
    }

    return (
        <div className='flex p-4  justify-between border-b border-gray-800'>
            <div className='flex gap-2 items-start'>
                <img src={comment.user.avatar} width={35} />
                <div>
                    <p className='text-sm font-semibold pb-1'>{comment.user.username}</p>
                    <p className='text-sm text-gray-200 '>{comment.text}</p>
                </div>
            </div>

            <div className="dropdown dropdown-end ">
                <button className=""><Ellipsis width={15} /></button>
                <ul className="relative top-0 menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {
                        user?._id != comment.user._id && (
                            user?.following?.includes(comment.user._id)
                                ? (<li>
                                    <button
                                        onClick={() => followAndUnFollow(comment.user._id)}
                                        >
                                        {isLoading ?
                                            <div className='flex gap-2 items-center font-semibold'>
                                                <UserRoundX width={16} /> Loading...
                                            </div>
                                            :
                                            <div className='flex gap-2 items-center font-semibold'>
                                                <UserRoundX width={16} /> Unfollow {comment.user.username}
                                            </div>
                                        }
                                    </button>
                                </li>

                                ) : (

                                    <li>
                                        <button
                                            onClick={() => followAndUnFollow(comment.user._id)}
                                            >
                                            {isLoading ?
                                                <div className='flex gap-2 items-center font-semibold'>
                                                    <UserRoundPlus width={16} /> Loading...
                                                </div>
                                                :
                                                <div className='flex gap-2 items-center font-semibold'>
                                                    <UserRoundPlus width={16} /> Follow {comment.user.username}
                                                </div>
                                            }
                                        </button>
                                    </li>)
                        )
                    }
                    {
                        user?._id === comment.user._id && (
                            <li>
                                <button
                                    onClick={() => deleteCommentHandler(postId, comment._id)}
                                    > {

                                        isLoadingDeleteComment ? (
                                            <div className='flex gap-2 items-center text-red-600 font-semibold'>
                                                <Trash2 width={16} color='red'/> Deleting...
                                            </div>
                                        ) : (
                                            <div className='flex gap-2 items-center text-red-600 font-semibold'>
                                                <Trash2 width={16} color='red'/> Delete 
                                            </div>
                                        )}

                                </button>
                            </li>
                        )
                    }
                </ul>

            </div>

        </div>
    )
}

export default Comments