import React, { useEffect } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getFollowingPosts } from '../redux/postSlice'

const useGetFollowingPosts = () => {
    const {refresh} = useSelector(store=>store.post)
    const dispatch = useDispatch()

    const fetchPosts = async() => { 
        try {
            const res = await axios.get(`${POST_API_END_POINT}/followingposts`,{
                withCredentials: true,
            })
            dispatch(getFollowingPosts(res.data.posts));
        } catch (error) {
            console.log("useGetFollowingPosts error: " + error)
        }

    }

    useEffect(()=>{
        fetchPosts()
    },[refresh])
}

export default useGetFollowingPosts