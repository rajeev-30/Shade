import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMediaPosts } from '../redux/postSlice';

const useGetMediaPosts = () => {
    const {userPosts, refresh} = useSelector(store=>store.post);
    const dispatch = useDispatch();

    const fetchPosts = async() => {
        try {
            const res = await userPosts?.filter(post => post.img);
            dispatch(getMediaPosts(res));
        } catch (error) {
            console.log("useGetMediaPosts error: " + error)
        }
    }

    useEffect(()=>{
        fetchPosts();
    },[userPosts])
}

export default useGetMediaPosts