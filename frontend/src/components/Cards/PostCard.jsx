import axios from 'axios';
import { Bookmark, Ellipsis, EllipsisVertical, Heart, MessageCircle, PenLine, Trash2, UserRoundMinus, UserRoundPlus, UserRoundX } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST_API_END_POINT } from '../../utils/Constant';
import { getRefresh } from '../../redux/postSlice';
import useFollowAndUnFollow from '../../hooks/useFollowAndUnFollow';
import toast from 'react-hot-toast';
import { setSigninModal } from '../../redux/userSlice';
import { Link } from 'react-router-dom';
import useFormatDate from '../../hooks/useFormatDate';

const PostCard = ({ post, openPost = false }) => {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch()
  const [isLoadingDeletePost, setIsLoadingDeletePost] = useState(false)
  const [isEditPost, setIsEditPost] = useState(false)
  const [editText, setEditText] = useState(post.text)
  const textareaRef = useRef(null);

  const [followAndUnFollow, isLoading] = useFollowAndUnFollow();
  const createdAt = useFormatDate(post.createdAt);

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

  const editPostHandler = async(req, res) => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/edit/${post._id}`, {editText}, {
        withCredentials: true,
      })
      dispatch(getRefresh());
      toast.success(res.data.message)
      setIsEditPost(!isEditPost)
      
    } catch (error) {
      console.log("Edit post error: ", error)
      toast.error(error?.response?.data?.message)
    }
  }

  // const textareaClickHandler =()=>{
  //   textareaRef.current.focus();
  // }

  useEffect(()=>{
    if(isEditPost){
      textareaRef?.current.focus();
    }
    console.log(isEditPost)
  },[isEditPost])
  
  useEffect(()=>{
    setEditText(post.text);
  },[post])

  const getRowCount = () => {
    const lines = editText.split('\n');
    let rowCount = lines.length;
    lines.forEach(line => {
      rowCount += Math.floor(line.length / 70); // Assume average line width is 70 characters
    });
    // row count between 1 and 20
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
        setEditText(inputText);
    }
  };


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
            <div className='flex items-center'>
              <p className='text-md font-semibold'>{post.user.username}</p>
              <span className="text-gray-400 mx-1 text-sm font-bold">•</span>
              <p className='text-xs text-gray-400'>{createdAt}</p>
            </div>
            <p className='text-xs text-gray-400'>{post.user.profession}</p>
          </Link>
          
        </div>
        {
          isEditPost? (
            <button
              onClick={editPostHandler} 
              className='flex justify-start text-sm font-semibold text-[#d75f41]'>
              Done
            </button>
          ) : (
              <div className="dropdown dropdown-end ">
                <button className=""><Ellipsis width={18} /></button>
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
                      <>
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
                        <li>
                          <button
                            onClick={() => setIsEditPost(true)} 
                            className='flex gap-2 items-center font-semibold'>
                              <PenLine width={16} /> Edit
                          </button>
                        </li>
                      </>
                    )
                  }
                </ul>
              </div>
            )
        }
        
      </div>
      {
        post.text && (
          openPost
            ? <p className='text-gray-300 whitespace-pre-wrap font-montserrat'>
                  {
                      isEditPost ? (
                        <div>
                          <textarea
                            ref={textareaRef}
                            value={editText}
                            onChange={handleTextChange}
                            id="message"
                            name="message"
                            rows={getRowCount()}
                            className="w-full pr-4 text-gray-300 bg-inherit outline-none resize-none"
                            placeholder="Write Fearlessly..."
                        ></textarea>
                        </div>
                      ) : (
                        post?.text
                      )
                    }
            </p>

            : <>
              <Link
                to={isEditPost && !openPost? null : `/post/${post._id}`}>
                <p ref={textRef} className={`text-gray-300 overflow-hidden transition-max-height duration-300 whitespace-pre-wrap font-montserrat  ${isExpanded && !openPost? 'max-h-none' : 'max-h-60'}`}>
                    {
                      isEditPost ? (
                        <div>
                          <textarea
                            ref={textareaRef}
                            value={editText}
                            onChange={handleTextChange}
                            id="message"
                            name="message"
                            rows={getRowCount()}
                            className="w-full pr-4 text-gray-300 bg-inherit shadow-sm outline-none resize-none"
                            placeholder="Write Fearlessly..."
                        ></textarea>
                        </div>
                      ) : (
                        post?.text
                      )
                    }
                </p>
              </Link>

              {showButton && (
                <div className='flex justify-end '>
                  <button onClick={toggleExpanded} className=" border-b border-black text-sm font-semibold hover:border-gray-400 text-gray-400">
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