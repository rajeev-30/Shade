import React from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { getRefresh } from '../redux/postSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const useCreatePost = () => {
    const dispatch = useDispatch();
    const createPost = async(text, img, setText) => {
        try {
            const res = await axios.post(`${POST_API_END_POINT}/create`,
            {text, img}, {
                withCredentials: true
            });

            dispatch(getRefresh());
            setText("");
        } catch (error) {
            console.log("createPost error: " + error);
            toast.error(error?.response?.data?.message);
        }
    }

    return createPost;
}

export default useCreatePost