import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import useGetprofile from '../hooks/useGetprofile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/Constant';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/userSlice';

const Profile = () => {
    const {user, profile} = useSelector(store=>store.user)
    const params = useParams();
    const {id} = params
    const dispatch = useDispatch();
    useGetprofile(id);

    const followAndUnFollow = async() =>{
      try {
          const res = await axios.post(`${USER_API_END_POINT}/followandunfollow`,{id},{
              withCredentials: true
          })
          dispatch(getRefresh());
          toast.success(res.data.message);
      } catch (error) {
          console.log("FollowAndUnFollow errorrr: " + error);
      }
  }


  return (
    <div className='w-[46%] min-h-screen max-h-full relative left-[27%]'>
        <h1 className='text-2xl font-semibold p-4 border-b border-gray-800'>Profile</h1>

        <div className='px-8 pt-6 flex justify-between items-center'>
            <img className='w-20' src={`${profile?.avatar}`} alt=""  />
            {
              user?._id===id &&(
                <button className='px-4 py-2 border rounded-full text-sm'>Edit</button>
              )
            }
            {
              !(user?._id===id) &&(
                <button 
                  onClick={followAndUnFollow}
                  className={`px-4 py-2 border rounded-full text-sm ${user?.following?.includes(id)?"":"bg-[#d75f41] border-none"}`}>
                  {user?.following?.includes(id)?"Unfollow":"Follow"}
                </button>
              )
            }
        </div>

        <p className='text-xl px-8 pt-3 font-semibold'>{profile?.username}</p>

        <div className='px-8  text-gray-500'>
          <span className='text-gray-400 text-sm'>{profile?.gender}</span>
          <span className='text-gray-400 mx-1 text-lg font-bold'>•</span> 
          <span className='text-gray-400 text-sm'>{profile?.profession}</span>
        </div>

        <p className='px-8 py-4 text-gray-400 text-sm'>{profile?.bio}</p>

        <div className='px-10 flex justify-between'>

          <div className='flex flex-col justify-center items-center'>
            <p>0</p>
            <p className='text-gray-400 text-xs'>Posts</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p>{profile?.followers?.length}</p>
            <p className='text-gray-400 text-xs'>Followers</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p>{profile?.following?.length}</p>
            <p className='text-gray-400 text-xs'>Following</p>
          </div>

        </div>
          <div className='pr-6 flex justify-center pt-6 border-b border-gray-800'>
            <div className='h-8 border-b-2 border-[#d75f41] text-sm font-semibold'>Posts</div>
          </div>
    </div>
  )
}

export default Profile