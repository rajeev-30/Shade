import { Image } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
    const {user} = useSelector(store=>store.user)
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
                <button disabled={!user} className='bg-[#d75f41] px-4 py-2 rounded-full'>post</button>
            </div>
            <div className='border-b border-gray-800 '></div>

            <div className='w-full flex sticky top-0 bg-[#0F172A] bg-opacity-30 backdrop-blur-3xl'>
                <button className='w-[50%] flex justify-center py-4 hover:bg-gray-800 hover:bg-opacity-15 cursor-pointer border-b-2 border-red-500'>Home</button>
                <button className='w-[50%] flex justify-center py-4 hover:bg-gray-800 hover:bg-opacity-15 cursor-pointer focus:border-b-2 focus:border-red-500'>AMA</button>
            </div>
            We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨We had Joy we had fun,we had seasons in the Sun!!🌟✨
        </div>
    )
}

export default Feed