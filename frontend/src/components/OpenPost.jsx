import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POST_API_END_POINT } from '../utils/Constant'
import PostCard from './PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/postSlice'
import { setSigninModal } from '../redux/userSlice'
import PostShimmer from './Shimmer'

const OpenPost = () => {
    const [post, setPost] = useState(null);
    const {refresh} = useSelector(store=>store.post)

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const {id} = params;

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchPost = async(id) => {
        try {
            const res = await axios.get(`${POST_API_END_POINT}/post/${id}`,{
                withCredentials:true,
            })
            setPost(res.data.post)
        } catch (error) {
            console.log("getPost error: " + error);
        }
    }

    useEffect(()=>{
        fetchPost(id);
    },[id, refresh])

    return (
        <div className='w-[46%]'>

            <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
                <button onClick={handleGoBack}>
                    <ArrowLeft/>
                </button>
                <h1 className='text-2xl font-semibold'>Post</h1>
            </div>
        
        <div>
            {
                post 
                    ? <PostCard post={post} openPost={true}/>
                    : <PostShimmer/>
                
            }
            
        </div>

    </div>
  )
}

export default OpenPost