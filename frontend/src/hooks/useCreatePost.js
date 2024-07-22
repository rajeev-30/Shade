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
            // console.log("createPost error: " + res);
        } catch (error) {
            console.log("createPost error: ", error);
            if(error?.response?.data?.message)
                toast.error(error?.response?.data?.message);
            if(error.request.status===413){
                toast.error("Select image less than 5mb");
            }
        }finally{
            setIsLoading(false);
        }
    }

    return [createPost,isLoading];
}

export default useCreatePost