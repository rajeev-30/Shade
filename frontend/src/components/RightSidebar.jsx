import { Search } from 'lucide-react'
import React, { useRef, useState } from 'react'

const RightSidebar = () => {
    const [searchBorder, setSearchBorder] = useState(false)

    const showSearchBorder = () =>{
        setSearchBorder(true)
    }

    const searchRef = useRef();
    
    const hideSearchBorder = (e) =>{
        if(searchRef.current===e.target){
            setSearchBorder(false)
        }
    }
  return (
    <div ref={searchRef} onClick={hideSearchBorder} className='w-[27%] min-h-screen max-h-full fixed left-[73%] border-l border-gray-800 pl-4 py-4 pr-16  focus:bg-red-400'>
        <div onClick={showSearchBorder} className={`flex gap-2 bg-gray-800 bg-opacity-50 px-4 py-3 rounded-full ${searchBorder? "border border-[#d75f41]":"border border-gray-800 border-opacity-50"}`}>
            <div className='flex items-center'>
                <Search size={16}/>
            </div>
            <input className='w-full bg-gray-800 bg-opacity-0 outline-none ' type="text" placeholder='Search users'/>
        </div>

        <div className='w-full my-6 bg-gray-800 bg-opacity-50 rounded-xl py-2'>
            <div className='w-full flex justify-between py-2 px-4'>
                <p className='flex items-center'>Rajeev</p>
                <button className='px-4 py-2 bg-[#d75f41] text-xs rounded-full'>Follow</button>
            </div>
            <div className='w-full flex justify-between py-2 px-4'>
                <p className='flex items-center'>Rajeev</p>
                <button className='px-4 py-2 bg-[#d75f41] text-xs rounded-full'>Follow</button>
            </div>
            <div className='w-full flex justify-between py-2 px-4'>
                <p className='flex items-center'>Rajeev</p>
                <button className='px-4 py-2 bg-[#d75f41] text-xs rounded-full'>Follow</button>
            </div>
        </div>
    </div>
  )
}

export default RightSidebar