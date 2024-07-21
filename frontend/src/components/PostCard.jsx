import axios from 'axios';
import { Bookmark, EllipsisVertical, Heart, MessageCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_API_END_POINT } from '../utils/Constant';
import { getRefresh } from '../redux/postSlice';
import useFollowAndUnFollow from '../hooks/useFollowAndUnFollow';
import toast from 'react-hot-toast';

const PostCard = ({post}) => {
  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch()

  const [followAndUnFollow, isLoading] = useFollowAndUnFollow();

  const likeUnLikeHandler = async(id) => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/likeandunlike/${id}`,{},{
        withCredentials: true,
      })
      dispatch(getRefresh())
    } catch (error) {
      console.log("likeUnlikeHandler error: " + error)
    }
  }

  const saveUnSaveHandler = async(id) => { 
    try {
      const res = await axios.post(`${POST_API_END_POINT}/saveandunsave/${id}`,{},{
        withCredentials: true,
      })
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log("saveUnSaveHandler error: " + error)
    }
  }

  const deletePostHandler = async(id) => {
    try {
      const res = await axios.delete(`${POST_API_END_POINT}/delete/${id}`,{
        withCredentials: true,
      })
      dispatch(getRefresh())
      toast.success(res.data.message);
    } catch (error) {
      console.log("deletePostHandler error: " + error)
    }
  }

  return (
    <div className='w-full p-4 border-t border-gray-800'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center pb-4'>
          <img src={`${post.user.avatar}`} width={35} />
          <div>
            <p className='text-md font-semibold'>{post.user.username}</p>
            <p className='text-xs text-gray-400'>{post.user.profession}</p>
          </div>
        </div>

        <div className="dropdown dropdown-end ">
          <button className=""><EllipsisVertical width={15}/></button>
              <ul className="relative top-0 menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {
                  user?._id!=post.user._id && (
                    user?.following?.includes(post.user._id)
                      ?(<li><button onClick={()=>followAndUnFollow(post.user._id)}>{isLoading?"Loading...":"Unfollow"}</button></li>)
                      :(<li><button onClick={()=>followAndUnFollow(post.user._id)}>{isLoading?"Loading...":"Follow"}</button></li>)
                  )
                }
                {
                  user?._id===post.user._id && (
                    <li><button onClick={()=>deletePostHandler(post._id)}>Delete Post</button></li>
                  )
                }
              </ul>
 
        </div>
      </div>
      {
        post.text && (
          <p className=''>{post.text}</p>
        )
      }
      {
        post.img && (
          <img src={post.img}/>
        )
      }
      <div className='flex justify-between pt-4'>

        <div className='flex gap-6'>
            <button className='flex gap-2 items-center border border-gray-800 px-2 rounded-full hover:border-blue-600'>
              <MessageCircle width={16} color="#c8bcbc"/>
              <p className='text-sm text-[#c8bcbc]'>{post.comments.length}</p>
            </button>

            <button onClick={()=>likeUnLikeHandler(post._id)} className='flex gap-2 items-center border border-gray-800 px-2 rounded-full hover:border-red-600'>
              <Heart width={16} color={`${post.likes.includes(user?._id)?"red":"#c8bcbc"}`}/>
              <p className={`text-sm ${post.likes.includes(user?._id)?'text-red-500':'text-[#c8bcbc]'}`}>{post.likes.length}</p>
            </button>
        </div>

        <button onClick={()=>saveUnSaveHandler(post._id)} className={`flex gap-2 items-center border  border-gray-800 px-3 rounded-full hover:border-[#31d0e1]`}>
          <Bookmark width={16} color={`${post?.saves.includes(user?._id)?"#31d0e1":"#c8bcbc"}`}/>
          <p className={`text-sm ${post.saves.includes(user?._id)?'text-[#31d0e1]':'text-[#c8bcbc]'}`}>{post.saves.length}</p>
        </button>
      </div>
      
    </div>
  )
}

export default PostCard