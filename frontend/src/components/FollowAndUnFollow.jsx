import axios from 'axios';
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import toast from 'react-hot-toast';

const FollowAndUnFollow = ({id}) => {
  const followAndUnFollow = async() =>{
    try {
        const res = await axios.post(`${USER_API_END_POINT}/followandunfollow`,{id},{
            withCredentials: true
        })
        toast.success(res.data.message);
    } catch (error) {
        console.log("FollowAndUnFollow error: " + error);
    }
  }

  useEffect(()=>{
    followAndUnFollow();
  },[id])
}

export default FollowAndUnFollow