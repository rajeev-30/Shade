import { ArrowLeft } from 'lucide-react'
import AllusersCard from './AllusersCard'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers } from '../redux/userSlice';
import UserShimmer from './Shimmer';

const Followers = () => {
    const params = useParams()
    const {id} = params
    // const [followers,setFollowers] = useState([]);
    const {followers, refresh} = useSelector(store=>store.user);
    const [currUser,setCurrUser] = useState(null);
    const dispatch = useDispatch()

    const fetchFollowers =  async(id) =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/followers/${id}`,{
                withCredentials: true
            })
            dispatch(getFollowers(res.data.followers));
            setCurrUser(res.data.user);
        } catch (error) {
            console.log("useGetfollowings error: " + error?.message);
            // toast.error(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
        fetchFollowers(id)
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

        <p className='text-2xl font-bold px-4 py-6'>{currUser?.followers?.length} Followers</p>
        {   
            followers?.map(user =>  <div key={user?._id}><AllusersCard singleUser={user}/></div> )
        }
        {
            !followers && (
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

export default Followers