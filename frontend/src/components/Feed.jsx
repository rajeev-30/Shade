import { Image } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useGetposts from '../hooks/useGetposts'
import PostCard from './PostCard'
import useGetFollowingPosts from '../hooks/useGetFollowingsPosts'

const Feed = () => {
    const {user} = useSelector(store=>store.user)
    const {posts, followingPosts} = useSelector(store=>store.post)
    const [togglePost, setTogglePost] = useState(true)

    useGetposts()
    useGetFollowingPosts()

    return (
        <div className='w-[46%]'>
            <h1 className='text-2xl font-semibold p-4 border-b border-gray-800'>Home</h1>
            <div className='flex gap-4'>
                {/* Profile photo */}
                <div className='pl-4 pt-4'>
                    <img src={`${user?.avatar}`} alt="" className='w-10'/>
                </div>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 w-full py-4 pr-4 bg-inherit  shadow-sm outline-none resize-none"
                    placeholder="Write Fearlessly..."
                ></textarea>
            </div>
            <div className=' px-4 flex justify-between py-2 '>
                <div className='flex items-center'>
                    <Image/>
                </div>
                <button disabled={!user} className={`bg-[#d75f41] px-4 py-2 rounded-full ${user?'':'opacity-50'}`}>post</button>
            </div>
            <div className='border-b border-gray-800 '></div>

            <div className='w-full flex sticky top-0 bg-[#0F172A] bg-opacity-30 backdrop-blur-3xl'>
                <div
                    onClick={()=>setTogglePost(true)}
                    className='w-1/2 flex justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-5'
                >
                    <button 
                        
                        className={` flex justify-center py-4   ${togglePost?'border-b-[3px] border-[#d75f41]':'text-gray-400'}`}>
                            Home
                    </button>
                </div>
                <div
                    onClick={()=>setTogglePost(false)}
                    className='w-1/2 flex justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-5'
                >
                    <button 
                        disabled={!user}
                        className={`flex justify-center py-4 ${togglePost?'text-gray-400':'border-b-[3px] border-[#d75f41]'}`}>
                            Following
                    </button>
                </div>
            </div>
            {
                togglePost && (
                    posts?.map((post)=> <div key={post._id}><PostCard post={post}/></div>)
                )
            } 
            {
                !togglePost && (
                    followingPosts?.map((post)=> <div key={post._id}><PostCard post={post}/></div>)
                )
            }
        </div>
    )
}

export default Feed