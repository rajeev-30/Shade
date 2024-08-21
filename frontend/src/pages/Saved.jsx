import { ArrowLeft, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useGetSavedPosts from '../hooks/useGetSavedPosts';
import { useSelector } from 'react-redux';
import PostCard from '../components/Cards/PostCard';
import PostShimmer from '../components/Common/Shimmer';

const Saved = () => {

  const [searchTxt, setSearchTxt] = useState("");
  const navigate = useNavigate();
  const {savedPosts} = useSelector(store=>store.post);
  const [searchedPosts, setSearchedPosts] = useState(null);
  useGetSavedPosts();

  useEffect(()=>{
    setSearchedPosts(
      savedPosts?.filter(post => post.text.toLowerCase().includes(searchTxt.toLowerCase()))
    )
  },[searchTxt])

  return (
    <div className='w-[46%] '>
      <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
        <button onClick={()=>navigate(-1)}>
          <ArrowLeft/>
        </button>
        <h1 className='text-2xl font-semibold'>Saved</h1>
      </div>

      <div className='w-full  p-4'>
        <div className='w-full flex items-center gap-2 px-4 py-3 rounded-full bg-gray-800 bg-opacity-50'>
          <Search width={18}/>
          <input
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            className='w-full outline-none bg-transparent' 
            type="text" 
            placeholder='Search Saved Posts'
          />
        </div>
      </div>

      {
        searchTxt?
          ( searchedPosts?
            searchedPosts?.length === 0 
            ? <div><p className="flex justify-center items-center text-xl pt-10 font-semibold">No Saved Post Found! </p></div>
            : searchedPosts?.map(post=> <PostCard key={post._id} post={post}/>)
          : <PostShimmer/> )
        :
        ( savedPosts?
              savedPosts?.length === 0 
              ? <div><p className="flex justify-center items-center text-xl pt-10 font-semibold">You haven't Saved any post yet! </p></div>
              : savedPosts?.map(post=> <PostCard key={post._id} post={post}/>)
          : <PostShimmer/> )
      }

    </div>
  )
}

export default Saved