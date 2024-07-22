import axios from 'axios'
import React, { useEffect } from 'react'
import { NOTIFICATION_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '../redux/NotificationSlice'
import { useNavigate } from 'react-router-dom'
import { setSigninModal } from '../redux/userSlice'

const useGetNotifications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const fetchNotifications = async() => {
        try {
            const res = await axios.get(`${NOTIFICATION_API_END_POINT}/notifications`, {
                withCredentials: true
            })
            dispatch(getNotifications(res?.data?.notifications));
        } catch (error) {
            console.log("useGetNotifications error: ", error);
            if(error?.response?.data?.isLoginRequired){
                dispatch(setSigninModal(true));
                navigate('/');
            }
        }
    }

    useEffect(()=>{
        fetchNotifications()
    },[])

}

export default useGetNotifications