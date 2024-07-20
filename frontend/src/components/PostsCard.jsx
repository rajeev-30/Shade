import { EllipsisVertical } from 'lucide-react'
import React from 'react'

const PostsCard = ({post}) => {
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
      
    </div>
  )
}

export default PostsCard