import axios from 'axios';
import { Bookmark, Ellipsis, EllipsisVertical, Heart, MessageCircle, Trash2, UserRoundMinus, UserRoundPlus, UserRoundX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_API_END_POINT } from '../utils/Constant';
import { getRefresh } from '../redux/postSlice';
import useFollowAndUnFollow from '../hooks/useFollowAndUnFollow';
import toast from 'react-hot-toast';
import { setSigninModal } from '../redux/userSlice';
import { Link } from 'react-router-dom';

const PostCard = ({ post, openPost = false }) => {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch()
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false)

  const [followAndUnFollow, isLoading] = useFollowAndUnFollow();

  const likeUnLikeHandler = async (id) => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/likeandunlike/${id}`, {}, {
        withCredentials: true,
      })
      dispatch(getRefresh())
    } catch (error) {
      console.log("likeUnlikeHandler error: " + error)
      if (error?.response?.data?.isLoginRequired) {
        dispatch(setSigninModal(true));
      }
    }
  }

  const saveUnSaveHandler = async (id) => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/saveandunsave/${id}`, {}, {
        withCredentials: true,
      })
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log("saveUnSaveHandler error: " + error)
      if (error?.response?.data?.isLoginRequired) {
        dispatch(setSigninModal(true));
      }

    }
  }

  const deletePostHandler = async (id) => {
    try {
      setIsLoadingDeletePost(true)
      const res = await axios.delete(`${POST_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      })
      dispatch(getRefresh())
      toast.success(res.data.message);
    } catch (error) {
      console.log("deletePostHandler error: " + error)
    } finally {
      setIsLoadingDeletePost(false);
    }
    if (error?.response?.data?.isLoginRequired) {
      dispatch(setSigninModal(true));
    }
  }




  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef?.current?.scrollHeight > textRef?.current?.clientHeight) {
      setShowButton(true);
    }
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };



  return (
    <div className='w-full p-4 border-t border-gray-800'>
      <div className='flex justify-between'>
        <div className='flex gap-2 items-center pb-4'>
          <Link to={`/profile/${post.user._id}`}> <img src={`${post.user.avatar}`} width={35} /> </Link>
          <Link to={`/profile/${post.user._id}`}>
            <p className='text-md font-semibold'>{post.user.username}</p>
            <p className='text-xs text-gray-400'>{post.user.profession}</p>
          </Link>
        </div>

        <div className="dropdown dropdown-end ">
          <button className=""><Ellipsis width={15} /></button>
          <ul className="max-w-fit relative top-0 menu dropdown-content bg-base-100 rounded-box z-[1] min-w-52 p-2 shadow">
            {
              user?._id != post.user._id && (
                user?.following?.includes(post.user._id)
                  ? (<li>
                    <button
                      onClick={() => followAndUnFollow(post.user._id)}>
                      {isLoading ?
                        <div className='flex gap-2 items-center'>
                          <UserRoundX width={16} /> Loading...
                        </div>
                        :
                        <div className='flex gap-2 items-center'>
                          <UserRoundX width={16} /> Unfollow&nbsp;{post.user.username}
                        </div>
                      }
                    </button>
                  </li>

                  ) : (

                    <li>
                      <button
                        onClick={() => followAndUnFollow(post.user._id)}>
                        {isLoading ?
                          <div className='flex gap-2 items-center font-semibold'>
                            <UserRoundPlus width={16} /> Loading...
                          </div>
                          :
                          <div className='flex gap-2 items-center font-semibold'>
                            <UserRoundPlus width={16} /> Follow&nbsp;{post.user.username}
                          </div>
                        }
                      </button>
                    </li>)
              )
            }
            {
              user?._id === post.user._id && (
                <li>
                  <button
                    onClick={() => deletePostHandler(post._id)}> {

                      isLoadingDeletePost ? (
                        <div className='flex gap-2 items-center text-red-600 font-semibold'>
                          <Trash2 width={16} color='red' /> Deleting...
                        </div>
                      ) : (
                        <div className='flex gap-2 items-center text-red-600 font-semibold'>
                          <Trash2 width={16} color='red' /> Delete
                        </div>
                      )}

                  </button>
                </li>
              )
            }
          </ul>

        </div>
      </div>
      {
        post.text && (
          openPost
            ? <p className='text-gray-200'>
              {post.text}
            </p>

            : <>
              <Link
                to={`/post/${post._id}`}>
                <p ref={textRef} className={`text-gray-200 overflow-hidden transition-max-height duration-300 ${isExpanded ? 'max-h-none' : 'max-h-24'}`}>
                  {post.text}
                </p>
              </Link>

              {showButton && (
                <div className='flex justify-end '>
                  <button onClick={toggleExpanded} className=" border-b border-black text-sm font-semibold hover:border-gray-400">
                    {isExpanded ? '...see less' : '...see more'}
                  </button>
                </div>
              )}
            </>
        )
      }
      {
        post.img && (
          <img src={post.img} className='max-h-[600px] rounded-xl mt-4 object-cover' />
        )
      }
      <div className='flex justify-between pt-4'>

        <div className='flex gap-6'>
          {
            openPost
              ? <button className='flex gap-2 items-center border border-gray-800 px-2 rounded-full hover:border-blue-600'>
                <MessageCircle width={16} color="#c8bcbc" />
                <p className='text-sm text-[#c8bcbc]'>{post.comments.length}</p>
              </button>
              : <Link
                to={`/post/${post._id}`}
              >
                <button className='flex gap-2 items-center border border-gray-800 px-2 rounded-full hover:border-blue-600'>
                  <MessageCircle width={16} color="#c8bcbc" />
                  <p className='text-sm text-[#c8bcbc]'>{post.comments.length}</p>
                </button>
              </Link>
          }

          <button onClick={() => likeUnLikeHandler(post._id)} className='flex gap-2 items-center border border-gray-800 px-2 rounded-full hover:border-red-600'>
            <Heart width={16} color={`${post.likes.includes(user?._id) ? "red" : "#c8bcbc"}`} />
            <p className={`text-sm ${post.likes.includes(user?._id) ? 'text-red-500' : 'text-[#c8bcbc]'}`}>{post.likes.length}</p>
          </button>
        </div>

        <button onClick={() => saveUnSaveHandler(post._id)} className={`flex gap-2 items-center border  border-gray-800 px-3 rounded-full hover:border-[#31d0e1]`}>
          <Bookmark width={16} color={`${post?.saves.includes(user?._id) ? "#31d0e1" : "#c8bcbc"}`} />
          <p className={`text-sm ${post.saves.includes(user?._id) ? 'text-[#31d0e1]' : 'text-[#c8bcbc]'}`}>{post.saves.length}</p>
        </button>
      </div>

    </div>
  )
}

export default PostCard