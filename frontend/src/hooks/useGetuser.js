import axios from 'axios';
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';

const useGetuser = () => {
    const {refresh} = useSelector(store=>store.user)
    const dispatch = useDispatch();
        const fetchuser = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/getuser`,{
                withCredentials: true,
            })

            dispatch(getUser(res.data.user));
        } catch (error) {
            console.log("useGetuser error: "+error);
        }
    }

    useEffect(()=>{
        fetchuser();
    },[refresh])
}

export default useGetuser