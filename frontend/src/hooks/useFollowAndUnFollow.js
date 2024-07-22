import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { USER_API_END_POINT } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { getRefresh, setSigninModal } from '../redux/userSlice'
import toast from 'react-hot-toast'

const useFollowAndUnFollow = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState();
    const followAndUnFollow = async(id) =>{
        setIsLoading(true)
        try {
            const res = await axios.post(`${USER_API_END_POINT}/followandunfollow/${id}`,{},{
                withCredentials: true
            })
            dispatch(getRefresh())
            toast.success(res.data.message);
        } catch (error) {
            console.log("FollowAndUnFollow error: " + error?.message);
            // toast.error(error?.response?.data?.message);
            if(error?.response?.data?.isLoginRequired){
                dispatch(setSigninModal(true));
            }
        }finally{

            setIsLoading(false)
        }
    }
    return [followAndUnFollow, isLoading];

}

export default useFollowAndUnFollow