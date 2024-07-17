import axios from 'axios';
import React, { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/userSlice';

const useGetallusers = () => {
    const dispatch = useDispatch();
    const fetchAllUsers = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/allusers`,{
                withCredentials:true,
            })
            dispatch(getAllUsers(res.data.allUsers))
        } catch (error) {
            console.log("Failed to fetch all users: "+error);
        }
    }

    useEffect(()=>{
        fetchAllUsers();
    },[])
}

export default useGetallusers