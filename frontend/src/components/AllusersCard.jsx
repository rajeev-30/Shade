import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/Constant';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getRefresh } from '../redux/userSlice';
import useFollowAndUnFollow from '../hooks/useFollowAndUnFollow';

const AllusersCard = ({singleUser}) => {
    const {user} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const followAndUnFollow = useFollowAndUnFollow();


  return (
    <div>
        <div className='w-full flex justify-between py-2 px-4'>
            <div className='w-[70%] overflow-scroll flex gap-2 items-center'>
                <img src={`${singleUser.avatar}`} width={35}/>
                <Link 
                    to={`/profile/${singleUser?._id}`}
                    className='w-fit flex items-center cursor-pointer hover:border-b hover:border-gray-700'>
                    {singleUser?.username}
                </Link>
            </div>
                {
                    user?._id===singleUser._id && (
                        <Link 
                            to={`/profile/${singleUser?._id}`}
                            className="px-4 py-2 bg-[#d75f41] text-xs rounded-full bg-inherit border  ">
                                Profile
                        </Link>
                        // console.log(user)
                    )
                }
                {
                    user?.following?.includes(singleUser._id) && (
                        <button 
                            onClick={()=>followAndUnFollow(singleUser._id)}
                            className="px-4 py-2 bg-[#d75f41] text-xs rounded-full bg-inherit border ">
                                Unfollow
                        </button>
                        // console.log(user)
                    )
                }
                
                {
                    !(user?.following?.includes(singleUser._id) || user?._id===singleUser._id) &&(
                        <button 
                            onClick={()=>followAndUnFollow(singleUser._id)}
                            disabled={!user} 
                            className="px-4 py-2 bg-[#d75f41] text-xs rounded-full">
                                Follow
                        </button>
                        // console.log(singleUser._id)
                    )
                }
                {/* <button 
                    disabled={!user} 
                    className={`px-4 py-2 bg-[#d75f41] text-xs rounded-full ${user?.following?.includes(singleUser._id) || user?._id===singleUser._id ?"bg-inherit border border-[#d75f41] ":""}`}>
                        {user?.following?.includes(singleUser._id) || user?._id===singleUser._id ?"Profile":"Follow"}
                </button> */}
        </div>
    </div>
  )
}

export default AllusersCard