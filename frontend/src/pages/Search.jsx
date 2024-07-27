import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FiSearch } from "react-icons/fi";
import { useSelector } from 'react-redux';
import PostCard from '../components/Cards/PostCard';
import useGetposts from '../hooks/useGetposts';
import Shimmer from '../components/Common/Shimmer';
import useGetuser from '../hooks/useGetuser';
import SearchUserCard from '../components/Cards/SearchUserCard';

const Search = () => {
  const {posts} = useSelector(store=>store.post);
  const {allUsers, user} = useSelector(store=>store.user);
  const navigate  = useNavigate()
  const [searchBorder, setSearchBorder] = useState(false);
  const searchRef = useRef();
  const [searchText, setSearchText] = useState("");
  const [toggleSearch, setToggleSearch] = useState(true);
  const [searchedPosts, setSearchPosts] = useState(null); 
  const [searchedUsers, setSearchedUsers] = useState(null); 

  const hideSearchBorder = (e) =>{
    if(searchRef.current===e.target){
        setSearchBorder(false)
    }
  }

  const showSearchBorder = () =>{
    setSearchBorder(true)
  }

  useGetposts();
  useGetuser();

  useEffect(()=>{
    setSearchPosts(
      posts?.filter(post => post.text.toLowerCase().includes(searchText.toLowerCase()))
    )

    setSearchedUsers(
      allUsers?.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))
    )
  },[searchText])

  return (
    <div ref={searchRef} onClick={hideSearchBorder} className='w-[46%]'>
      <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
            <button onClick={()=>navigate(-1)}>
                <ArrowLeft/>
            </button>
            <h1 className='text-2xl font-semibold'>Search</h1>
      </div>

      <div className='p-4 border-b border-gray-800'>
        <div   className={`w-full flex gap-2 bg-gray-800 bg-opacity-50 px-4 rounded-full ${searchBorder? "border border-[#d75f41]":"border border-gray-800 border-opacity-50"}`}>
                <div className='flex items-center'>
                    <FiSearch size={16}/>
                </div>
                <input
                onClick={showSearchBorder} 
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    className='w-full py-3 bg-gray-800 bg-opacity-0 outline-none ' 
                    type="text" 
                    placeholder='Search users'/>
          </div>
      </div>

      <div className='p-4 w-full flex border-b border-gray-800'>
        <div
          onClick={()=>setToggleSearch(true)}  
          className={`w-1/2 text-center font-semibold py-2 bg-gray-800 bg-opacity-30 cursor-pointer rounded-lg ${toggleSearch?'bg-opacity-50':''}`}>
            Posts
          </div>
        <div
          onClick={()=>setToggleSearch(false)} 
          className={`w-1/2 text-center font-semibold py-2 bg-gray-800 bg-opacity-30 cursor-pointer rounded-lg ${toggleSearch?'':'bg-opacity-50'}`}>
            Profile
        </div>
      </div>

      {
        searchText && (
            <p className='text-gray-400 p-6 border-b border-gray-800' >Results for "{searchText}"...</p>
        )
      }
      
      
      {
        !searchText && toggleSearch && (
          posts
            ? posts?.map((post) => <div key={post._id}> <PostCard post={post}/> </div>)
            : <Shimmer/>
        )
      } {
        !searchText && !toggleSearch && (
          allUsers
            ? allUsers.map((SingleUser) => {
              if(SingleUser._id!==user?._id){
                return <div key={SingleUser._id}> <SearchUserCard user={SingleUser}/> </div>
              }
            })
            : <Shimmer/>
        )
      }

      {
        searchText && toggleSearch && (
          searchedPosts.length===0
            ? <div className='p-4 font-semibold'> No Posts Found! </div>
            : searchedPosts?.map(post => <div key={post._id}> <PostCard post={post}/> </div>)
        )
      }
      {
        searchText && !toggleSearch && (
          searchedUsers.length===0
          ? <div className='p-4 font-semibold'> No Profile Found! </div>
          : searchedUsers.map(user => <div key={user._id}> <SearchUserCard user={user}/> </div>)
        )
      }
    </div>
  )
}

export default Search