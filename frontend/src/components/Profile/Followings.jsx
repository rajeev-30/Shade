import { ArrowLeft } from 'lucide-react'
import AllusersCard from '../Cards/UserCard'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../../utils/Constant';
import UserShimmer from '../Common/Shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowings } from '../../redux/userSlice';

const Followings = () => {
    const params = useParams()
    const {id} = params
    // const [followings,setFollowings] = useState(null);
    const {followings, refresh} = useSelector(state=>state.user)
    const [currUser,setCurrUser] = useState(null);
    const dispatch = useDispatch()

    const fetchFollowings =  async(id) =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/followings/${id}`,{
                withCredentials: true
            })
            dispatch(getFollowings(res.data.followings));
            setCurrUser(res.data.user);
        } catch (error) {
            console.log("useGetfollowings error: " + error?.message);
            // toast.error(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        fetchFollowings(id)
    },[id, refresh])
    
  return (
    <div className='w-[46%] min-h-screen max-h-full'>
        <div className='flex gap-4 px-4 py-6 items-center border-b border-gray-800'>
            <Link to={`/profile/${id}`}>
                <ArrowLeft/>
            </Link>
            <div className='flex gap-3 items-center'>
                <img src={`${currUser?.avatar}`} width={35} />
                <div>
                    <p className='text-sm font-semibold'>{currUser?.username}</p>
                    <p className='text-xs text-gray-400'>{currUser?.profession}</p>
                </div>
            </div>
        </div>

        <p className='text-2xl font-bold px-4 py-6'>{currUser?.following?.length} Following</p>
        {   
            followings?.map(user =>  <div key={user?._id}><AllusersCard singleUser={user}/></div> )
        }
        {
            !followings && (
                <>
                <UserShimmer/>
                {/* <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/>
                <UserShimmer/> */}
                </>
            )
        }
    </div>
  )
}

export default Followings