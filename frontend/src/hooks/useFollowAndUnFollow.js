import axios from 'axios'
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { getRefresh } from '../redux/userSlice'
import toast from 'react-hot-toast'

const useFollowAndUnFollow = () => {
    const dispatch = useDispatch()

    return async(id) =>{
        try {
            const res = await axios.post(`${USER_API_END_POINT}/followandunfollow/${id}`,{},{
                withCredentials: true
            })
            dispatch(getRefresh())
            toast.success(res.data.message);
        } catch (error) {
            console.log("FollowAndUnFollow error: " + error?.message);
            toast.error(error?.response?.data?.message);
        }
    }

}

export default useFollowAndUnFollow