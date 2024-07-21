import axios from 'axios'
import { useEffect } from 'react'
import { POST_API_END_POINT } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { getSavedPosts } from '../redux/postSlice'

const useGetSavedPosts = () => {
    const dispatch = useDispatch();
    const {refresh} = useSelector(store=>store.post);

    const fetchPosts = async() =>{
        try {
            const res = await axios.get(`${POST_API_END_POINT}/savedposts`,{
                withCredentials:true,
            })

            dispatch(getSavedPosts(res.data.posts));
        } catch (error) {
            console.log("useGetSavedPosts error: " + error)
        }
    }

    useEffect(()=>{
        fetchPosts()
    },[refresh])

}


export default useGetSavedPosts