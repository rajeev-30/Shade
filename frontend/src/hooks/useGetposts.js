import React, { useEffect } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getPosts } from '../redux/postSlice'

const useGetposts = () => {
    const {refresh} = useSelector(store=>store.post)
    const dispatch = useDispatch()

    const fetchPosts = async() => { 
        try {
            const res = await axios.get(`${POST_API_END_POINT}/allposts`,{
                withCredentials: true,
            })
            dispatch(getPosts(res.data.posts));
        } catch (error) {
            console.log("useGetposts error: " + error)
            console.log("asdf: "+error.response)
        }

    }

    useEffect(()=>{
        fetchPosts()
    },[refresh])
}

export default useGetposts