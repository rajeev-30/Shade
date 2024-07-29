import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGetprofile from "../hooks/useGetprofile";
import UpdateProfile from "../components/Profile/UpdateProfile";
import useFollowAndUnFollow from "../hooks/useFollowAndUnFollow";
import useGetLikedPosts from "../hooks/useGetLikedPosts";
import PostCard from "../components/Cards/PostCard";
import useGetSavedPosts from "../hooks/useGetSavedPosts";
import useGetUserPosts from "../hooks/useGetUserPosts";
import PostShimmer from "../components/Common/Shimmer";
import useGetMediaPosts from "../hooks/useGetMediaPosts";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const {likedPosts, savedPosts, userPosts, mediaPosts} = useSelector(store => store.post);
  const params = useParams();
  const { id } = params;
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [togglePost, setTogglePost] = useState()

  const navigate = useNavigate();
  useGetprofile(id);
  useGetLikedPosts();
  useGetSavedPosts();
  useGetUserPosts(id);
  useGetMediaPosts();

  const [followAndUnFollow, isLoading] = useFollowAndUnFollow();

  useEffect(()=>{
      setTogglePost('posts')
  },[id])

  return (
    <>
      <div className="w-[46%] min-h-screen max-h-full">
        <div className='p-4 flex items-center gap-4 border-b border-gray-800'>
                <button onClick={()=>navigate(-1)}>
                    <ArrowLeft/>
                </button>
                <h1 className='text-2xl font-semibold'>Profile</h1>
        </div>

        { profile
            ? <>
              <div className="px-8 pt-6 flex justify-between items-center">
                <img className="w-20" src={`${profile?.avatar}`} alt="" />
                {user?._id === id && (
                  <button
                    onClick={() => setEditProfileModal(true)}
                    className="px-4 py-2 border  rounded-full text-sm"
                  >
                    Edit
                  </button>
                )}
                {!(user?._id === id) && (
                  <button
                    onClick={() => followAndUnFollow(id)}
                    className={`px-4 py-2 border rounded-full text-sm ${
                      user?.following?.includes(id) ? "" : "bg-[#d75f41] border-none"
                    }`}
                  >
                    {user?.following?.includes(id) ? (isLoading?"Loading...":"Unfollow") : (isLoading?"Loading...":"Follow")}
                  </button>
                )}
              </div>

              <p className="text-xl px-8 pt-3 font-semibold">{profile?.username}</p>

              <div className="px-8 pt-1 text-gray-500">
                <span className="text-gray-400 text-sm">{profile?.gender}</span>
                {
                  profile?.profession && (
                    <span className="text-gray-400 mx-1 text-lg font-bold">•</span>
                  )
                }
                <span className="text-gray-400 text-sm">{profile?.profession}</span>
                {
                  profile?.bio && (
                    <p className=" pt-4 text-gray-400 text-sm">{profile?.bio}</p>
                  )
                }
              </div>
            </>
            : <PostShimmer/>
        }  

        <div className="px-10 pt-4 flex justify-between">
          <div className="flex flex-col justify-center items-center">
            <p>{userPosts?.length}</p>
            <p className="text-gray-400 text-xs">Posts</p>
          </div>

          <Link
            to={`/followers/${id}`}
            className="flex flex-col justify-center items-center">
            <p>{profile?.followers?.length}</p>
            <p className="text-gray-400 text-xs">Followers</p>
          </Link>

          <Link 
            to={`/followings/${id}`}
            className="flex flex-col justify-center items-center">
            <p>{profile?.following?.length}</p>
            <p className="text-gray-400 text-xs">Followings</p>
          </Link>
        </div>

        <div className="w-full flex justify-around pt-6 border-b border-gray-800">
          <div onClick={()=>setTogglePost("posts")} className={`${user?._id==id?'w-1/4':'w-1/2'} hover:bg-gray-400 hover:bg-opacity-10 flex justify-center cursor-pointer`}>
            <button 
              className={`py-4 flex justify-center ${togglePost==="posts"?'border-b-[3px] border-[#d75f41]':'text-gray-400'} text-sm font-semibold`}>
                Posts
            </button>
          </div>

          {
            user?._id==id && (
              <>
                <div onClick={()=>setTogglePost("liked")} className="w-1/4 hover:bg-gray-400 hover:bg-opacity-10 flex justify-center cursor-pointer">
                  <button
                    className={`py-4 flex justify-center ${togglePost==="liked"?'border-b-[3px] border-[#d75f41]':'text-gray-400'} text-sm font-semibold`}>
                      Liked 
                  </button>
                  </div>

                <div onClick={()=>setTogglePost("saved")}  className="w-1/4 hover:bg-gray-400 hover:bg-opacity-10 flex justify-center cursor-pointer">
                  <button
                    className={`py-4 flex justify-center ${togglePost==="saved"?'border-b-[3px] border-[#d75f41]':'text-gray-400'} text-sm font-semibold`}>
                      Saved 
                  </button>
                </div>
              </>
            )
          }

          <div onClick={()=>setTogglePost("media")}  className={`${user?._id==id?'w-1/4':'w-1/2'} hover:bg-gray-400 hover:bg-opacity-10 flex justify-center cursor-pointer`}>
            <button
              className={`py-4 flex justify-center ${togglePost==="media"?'border-b-[3px] border-[#d75f41]':'text-gray-400'} text-sm font-semibold`}>
                Media 
            </button>
          </div>
        </div>

          {
            togglePost==="posts" && (
              userPosts?.length==0
                ? <div><p className="flex justify-center items-center text-xl pt-10 font-semibold">{ user?._id===id?("You haven't Posted anything yet!"): ("No posts yet!") } </p></div>
                : userPosts
                  ? userPosts?.map( (post) => <div key={post._id}> <PostCard post={post}> </PostCard> </div>)
                  : <PostShimmer/>
            )
          } 
          {
            togglePost==="liked" && (
              likedPosts.length==0
                ? <div><p className="flex justify-center items-center text-xl pt-10 font-semibold">You haven't Liked any other User's post yet! </p></div>
                : likedPosts
                  ? likedPosts?.map( (post) => <div key={post._id}> <PostCard post={post}> </PostCard> </div>)
                  : <PostShimmer/>
              
            )
          }
          {
            togglePost==="saved" && (
              
              savedPosts.length===0
                ?<div><p className="flex justify-center items-center text-xl pt-10 font-semibold">You haven't Saved any post yet! </p></div>
                : savedPosts
                  ? savedPosts?.map( (post) => <div key={post._id}> <PostCard post={post}> </PostCard> </div> )
                  : <PostShimmer/>
            )
          }
          {
            togglePost==="media" && (
              
              mediaPosts?.length===0
                ?<div><p className="flex justify-center items-center text-xl pt-10 font-semibold">No media posts yet! </p></div>
                : mediaPosts
                  ? <div className="w-full grid gap-1 grid-cols-3">{mediaPosts?.map( (post) => <div key={post._id}> <Link to={`/post/${post._id}`}><img src={post.img} className="w-full h-48 object-cover" /> </Link></div>)}</div> 
                  : <PostShimmer/>
            )
          }
      </div>
      {editProfileModal && (
        <UpdateProfile onClose={() => setEditProfileModal(false)} />
      )}
    </>
  );
};

export default Profile;
