import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../utils/Constant';
import { getProfile, getUser, setSigninModal } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const useGetprofile = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {refresh} = useSelector(store=>store.user)
  const fetchProfile = async() =>{
    try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
            withCredentials:true
        });
        // console.log(res);
        dispatch(getProfile(res.data?.user))
    } catch (error) {
        console.log("getProfile error: "+error);
        toast.error(error?.response?.data?.message);
        if(error?.response?.data?.isLoginRequired){
          dispatch(setSigninModal(true));
          navigate('/');
          dispatch(getUser(null));
          dispatch(getProfile(null));
        }
    }
  }

  useEffect(()=>{
    fetchProfile();
  },[refresh,id])

}

export default useGetprofile