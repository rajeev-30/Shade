import React from 'react'
import { useNavigate } from 'react-router-dom'


const SearchUserCard = ({user}) => {
    const navigate = useNavigate()
    return (
        <div
            onClick={()=>navigate(`/profile/${user._id}`)} 
            className='p-4 w-full flex gap-4 items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-25'>
            <div>
                <img src={user.avatar} width={40} />
            </div>

            <div>
                <p className='font-semibold text-md'>{user.username}</p>
                <div className='flex items-center'>
                    <p className='text-xs text-gray-400' >{user.profession}</p>
                    {
                        user.profession && (
                            <span className="text-gray-400 mx-1 text-xs font-bold">•</span>
                        )
                    }
                    <p className='text-xs text-gray-400'>followers {user.followers.length}</p>
                </div>
            </div>
        </div>
    )
}

export default SearchUserCard