import axios from 'axios'
import React, { useEffect } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../redux/postSlice'

const useGetUserPosts = (id) => {
    const {refresh} = useSelector(store=>store.post);

    const dispatch = useDispatch()
    const fetchPost = async () =>{
        try {
            const res = await axios.get(`${POST_API_END_POINT}/userposts/${id}`, {
                withCredentials: true, 
            })
            dispatch(getUserPosts(res.data.posts));

        } catch (error) {
            console.log("useGetUserPosts error: " + error)
        }
    }

    useEffect(()=>{
        fetchPost()
    },[id,refresh])
}

export default useGetUserPosts