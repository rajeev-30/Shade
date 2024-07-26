import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { POST_API_END_POINT } from '../utils/Constant'
import PostCard from './PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { getPost, getRefresh } from '../redux/postSlice'
import { setSigninModal } from '../redux/userSlice'
import PostShimmer from './Shimmer'
import Comments from './Comments'
import Shimmer from './Shimmer'
import toast from 'react-hot-toast'

const OpenPost = () => {
    const {refresh, post} = useSelector(store=>store.post)
    const {user} = useSelector(store=>store.user)
    const [text, setText] = useState("")
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    const {id} = params;

    const handleGoBack = () => {
        navigate(-1);
    };

    const fetchPost = async(id) => {
        try {
            const res = await axios.get(`${POST_API_END_POINT}/post/${id}`,{
                withCredentials:true,
            })
            dispatch(getPost(res.data.post));
        } catch (error) {
            console.log("getPost error: " , error);
        }
    }

    useEffect(()=>{
        fetchPost(id);
    },[id, refresh])

    const createCommentHandler = async(id) =>{
        setIsLoading(true);
        try {
            const res = await axios.post(`${POST_API_END_POINT}/comment/${id}`,{text}, {
                withCredentials:true,
            })
            dispatch(getRefresh());
            toast.success(res.data.message);
            setText("")
        } catch (error) {
            console.log("createCommentHandler error: ", error)
            toast.error(error?.response?.data?.message)
        }finally{
            setIsLoading(false);
        }
    }

    const getRowCount = () => {
        const lines = text.split('\n');
        let rowCount = lines.length;
        lines.forEach(line => {
          rowCount += Math.floor(line.length / 70); // Assume average line width is 70 characters
        });
        // Constrain the row count between 1 and 10
        if (rowCount < 1) {
            rowCount = 1;
        } else if (rowCount > 15) {
            rowCount = 15;
        }
        return rowCount;
    };

    //User can comment maximum of 500 characters
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setText(inputText);
        }
    };


    return (
        <div className='w-[46%]'>

            <div className={`p-4 flex items-center gap-4 ${post?'' : 'border-b border-gray-800'}`}>
                <button onClick={handleGoBack}>
                    <ArrowLeft/>
                </button>
                <h1 className='text-2xl font-semibold'>Post</h1>
            </div>
        
            {
                post 
                    ? <PostCard post={post} openPost={true}/>
                    : <div className='min-h-96'><PostShimmer/></div>
                
            }
        
        <div className='px-4 border-y pb-4 py-4 border-gray-800'>
            <div className='flex gap-2 items-start'>
                <img src={user?.avatar} width={35} />
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    id="message"
                    name="message"
                    rows={getRowCount()}
                    className="mt-1 w-full  bg-inherit  shadow-sm outline-none resize-none"
                    placeholder="Add a comment..."
                    >
                </textarea>
            </div>
            
            <div className='flex justify-end'>
                <button
                    disabled={!user || !text}
                    onClick={()=>createCommentHandler(post?._id)}
                    className={`px-3 py-2 bg-[#d75f41] rounded-full text-sm font-semibold ${user && text?'':'opacity-50'}`}
                    >
                        {isLoading?'Replying...':'Reply'}
                </button>
            </div>
        </div>
        
            <p className='font-semibold pt-4 pb-4 px-4'>{post?.comments?.length} Comments</p>
            {
                post 
                    ? post?.comments?.slice().reverse().map(
                        comment => 
                            <div key={comment._id}> 
                                <Comments comment={comment} postId={post?._id}/>
                            </div>
                        )
                    : <Shimmer/> 
            }
    </div>
  )
}

export default OpenPost