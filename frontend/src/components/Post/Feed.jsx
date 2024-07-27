import { Image, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useGetposts from '../../hooks/useGetposts'
import PostCard from '../Cards/PostCard'
import useGetFollowingPosts from '../../hooks/useGetFollowingsPosts'
import useCreatePost from '../../hooks/useCreatePost'
import PostShimmer from '../Common/Shimmer'
import { FaUserAlt } from "react-icons/fa";

const Feed = () => {
    const {user} = useSelector(store=>store.user)
    const {posts, followingPosts} = useSelector(store=>store.post)
    const [togglePost, setTogglePost] = useState(true)
    const [text, setText] = useState("");
    const [img, setImg] = useState(null)
    const imgRef = useRef(null)

    useGetposts()
    useGetFollowingPosts()
    

    const [createPost, isLoading] = useCreatePost();

    const handleImgClick = () => {
        imgRef.current.click();
    }

    const getRowCount = () => {
        const lines = text.split('\n');
        let rowCount = lines.length;
        lines.forEach(line => {
          rowCount += Math.floor(line.length / 70); // Assume average line width is 70 characters
        });
        // Constrain the row count between 1 and 20
        if (rowCount < 1) {
            rowCount = 1;
        } else if (rowCount > 20) {
            rowCount = 20;
        }
        return rowCount;
    };

    //User can post maximum of 1000 characters
    const handleTextChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setText(inputText);
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const render = new FileReader();
            render.onload = () => {
                setImg(render.result);
            };
            render.readAsDataURL(file);
        }
    };

    return (
        <div className='w-[46%]'>
            <h1 className='text-2xl font-semibold p-4 border-b border-gray-800'>Home</h1>
            <div className='flex gap-4'>
                <div className='pl-4 pt-4'>
                    {
                        user
                            ? <img src={`${user?.avatar}`} alt="" className='w-10'/>
                            : <FaUserAlt size={28} className='pt-1'/>
                    }
                </div>

                <textarea
                    value={text}
                    onChange={handleTextChange}
                    id="message"
                    name="message"
                    rows={getRowCount()}
                    className="mt-1 w-full py-4 pr-4 bg-inherit  shadow-sm outline-none resize-none"
                    placeholder="Write Fearlessly..."
                ></textarea>
            </div>
            {
                img && (<>
                    <div className=' flex justify-end px-4 mb-2'>
                        <X onClick={()=>{
                            setImg(null);
                            imgRef.current.value = null;
                        }} 
                        className='bg-gray-700 rounded-full p-1 cursor-pointer'/>
                    </div>
                    
                    <div className='pl-16 pr-4'>
                        <img src={img} className=' max-h-[600px] rounded-xl object-cover' />
                    </div>
                </>)
            }

            <div className=' px-4 flex justify-between py-2 '>

                <div className='flex items-center pl-12'>
                    <input type="file" accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
                    <Image className='cursor-pointer' onClick={handleImgClick}/>
                </div>

                <button
                    onClick={()=>createPost(text, img, setText, setImg)}
                    disabled={!user || (!img && !text)} 
                    className={`bg-[#d75f41] px-4 py-2 rounded-full ${!user || (!img && !text)?'opacity-50':''}`}>
                    {isLoading ? 'Posting...' :'Post'}
                </button>
            </div>

            <div className='border-b border-gray-800 '></div>

            <div className='w-full flex sticky top-0 bg-[#0F172A] bg-opacity-30 backdrop-blur-3xl'>
                <div
                    onClick={()=>setTogglePost(true)}
                    className='w-1/2 flex justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-5'
                >
                    <button 
                        
                        className={` flex justify-center py-4   ${togglePost?'border-b-[3px] border-[#d75f41]':'text-gray-400'}`}>
                            Home
                    </button>
                </div>
                <div
                    onClick={()=>setTogglePost(false)}
                    className='w-1/2 flex justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-5'
                >
                    <button 
                        disabled={!user}
                        className={`flex justify-center py-4 ${togglePost?'text-gray-400':'border-b-[3px] border-[#d75f41]'}`}>
                            Following
                    </button>
                </div>
            </div>
            {
                togglePost && (
                    !posts
                    ? <PostShimmer/>
                    : posts?.map((post)=> <div key={post._id}><PostCard post={post}/></div>)
                )
            } 
            {
                !togglePost && (
                    // followingPosts?.map((post)=> <div key={post._id}><PostCard post={post}/></div>)
                    followingPosts?.length==0
                        ? <div><p className="border-t border-gray-800 flex justify-center items-center text-xl pt-10 font-semibold">Your Followings haven't Posted anything yet! </p></div>
                        : followingPosts?.map( (post) => <div key={post._id}> <PostCard post={post}> </PostCard> </div>)
                )
            }
        </div>
    )
}

export default Feed