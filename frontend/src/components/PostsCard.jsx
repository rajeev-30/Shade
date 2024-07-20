import axios from 'axios';
import { Bookmark, EllipsisVertical, Heart, MessageCircle } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_API_END_POINT } from '../utils/Constant';
import { getRefresh } from '../redux/postSlice';

const PostsCard = ({post}) => {
  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch()
  const likeUnlikeHandler = async(id) => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/likeandunlike/${id}`,{},{
        withCredentials: true,
      })
      dispatch(getRefresh())
    } catch (error) {
      console.log("likeUnlikeHandler error: " + error)
    }
  }
  return (
    <div className='w-full p-4 border-b border-gray-800'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center pb-4'>
          <img src={`${post.user.avatar}`} width={35} />
          <div>
            <p className='text-md font-semibold'>{post.user.username}</p>
            <p className='text-xs text-gray-400'>{post.user.profession}</p>
          </div>
        </div>

        <div className='cursor-pointer'>
          <EllipsisVertical width={15}/>
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
          <div className='border border-gray-800 px-2 rounded-full'>
            <button className='flex gap-2 items-center '>
              <MessageCircle width={16} color="#c8bcbc"/>
              <p className='text-sm text-[#c8bcbc]'>{post.comments.length}</p>
            </button>
          </div>

          <div className='border border-gray-800 px-2  rounded-full'>
            <button onClick={()=>likeUnlikeHandler(post._id)} className='flex gap-2 items-center justify-center '>
              <Heart width={16} color={`${post.likes.includes(user?._id)?"red":"#c8bcbc"}`}/>
              <p className={`text-sm ${post.likes.includes(user?._id)?'text-red-500':'text-[#c8bcbc]'}`}>{post.likes.length}</p>
            </button>
          </div>
        </div>

        <button className={`border border-gray-800 px-3 rounded-full `}>
          <Bookmark width={16} color={`${user.savedPosts.includes(post?._id)?"#31d0e1":"#c8bcbc"}`}/>
        </button>
      </div>
      
    </div>
  )
}

export default PostsCard