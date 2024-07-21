import React, { useState } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { getRefresh } from '../redux/postSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const useCreatePost = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const createPost = async(text, img, setText, setImg) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${POST_API_END_POINT}/create`,
            {text, img}, {
                withCredentials: true
            });
            dispatch(getRefresh());
            setText("");
            setImg(null)
            toast.success(res.data.message);
        } catch (error) {
            console.log("createPost error: " + error);
            toast.error(error?.response?.data?.message);
        }finally{
            setIsLoading(false);
        }
    }

    return [createPost,isLoading];
}

export default useCreatePost