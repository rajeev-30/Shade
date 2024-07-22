import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notifications = () => {
  const navigate  = useNavigate()
  return (
    <div className='w-[46%]'>
        <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
            <button onClick={()=>navigate(-1)}>
                <ArrowLeft/>
            </button>
            <h1 className='text-2xl font-semibold'>Notofications</h1>
        </div>
    </div>
  )
}

export default Notifications