import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { USER_API_END_POINT } from '../utils/Constant';
import { getProfile, setSigninModal } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const useGetprofile = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchProfile = async() =>{
    try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
            withCredentials:true
        });
        // console.log(res);
        dispatch(getProfile(res.data?.user))
    } catch (error) {
        console.log("getProfile error: "+error);

        if(error?.response?.data?.isLoginRequired){
          dispatch(setSigninModal(true));
          navigate('/');
        }
    }
  }

  useEffect(()=>{
    fetchProfile();
  },[id])

}

export default useGetprofile