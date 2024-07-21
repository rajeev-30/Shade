import axios from 'axios'
import React, { useEffect } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getLikePosts } from '../redux/postSlice'

const useGetLikedPosts = () => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store=>store.post);

    const fetchPosts = async() =>{
        try {
            const res = await axios.get(`${POST_API_END_POINT}/likedposts`,{
                withCredentials:true,
            })

            dispatch(getLikePosts(res.data.posts));
        } catch (error) {
            console.log("useGetLikedPosts error: " + error)
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[refresh])

}

export default useGetLikedPosts