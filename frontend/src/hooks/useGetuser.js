import axios from 'axios';
import { useEffect } from 'react'
import { USER_API_END_POINT } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import {getUnFollowed, getUser, setSigninModal } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const useGetuser = () => {
    const {refresh} = useSelector(store=>store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const fetchuser = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/getuser`,{
                withCredentials: true,
            })

            dispatch(getUser(res.data.user));
        } catch (error) {
            console.log("useGetuser error: "+error);
            if(error?.response?.data?.isLoginRequired){
                dispatch(getUser(null));
                dispatch(getUnFollowed(null));
                dispatch(setSigninModal(true))
                navigate('/')
            }
        }
    }

    useEffect(()=>{
        fetchuser();
    },[refresh])
}

export default useGetuser