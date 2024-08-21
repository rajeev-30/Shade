import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Signin from '../Auth/SignIn';
import { NavLink, useNavigate } from 'react-router-dom';
import { setSigninModal } from '../../redux/userSlice';
//  React icons 
import { IoHomeSharp } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import CreatePostModal from '../Post/CreatePostModal';
import LogoutModal from '../Auth/LogoutModal';



const LeftSidebar = () => {
    const {user, signinModal} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [createPostModal, setCreatepostModal] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)


    return (
        <>
            <div className='w-[27%] min-h-screen max-h-full pl-32 border-r border-gray-800'>
                <div className='pt-4 sticky top-0'>
                    <NavLink 
                        to={"/"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10`}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? <IoHomeSharp size={23} /> : <IoHomeOutline size={23} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Home</p>
                            </>
                        )}
                    </NavLink>

                    <NavLink
                        to={"/search"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? <RiSearchFill size={24} /> : <RiSearchLine size={24} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Search</p>
                            </>
                        )}
                    </NavLink>
                    <NavLink
                        to={"/notifications"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? <IoMdNotifications size={25} /> : <IoMdNotificationsOutline size={25} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Notifications</p>
                            </>
                        )}
                    </NavLink>

                    <NavLink to={`/profile/${user?._id}`}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? <FaUser size={20} /> : <FaRegUser size={20} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Profile</p>
                            </>
                        )}
                    </NavLink>

                    <button
                        onClick={()=> user? setLogoutModal(true) : dispatch(setSigninModal(true))}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {
                            user
                                ?<div className='flex gap-5'> 
                                    <RiLogoutCircleRLine size={25}/>
                                    <button
                                        className="text-xl font-medium">
                                            Logout
                                    </button>
                                </div>

                                :<div className='flex gap-5'>
                                    <RiLoginCircleLine size={25}/>
                                    <button 
                                        className="text-xl font-medium">
                                            Login
                                    </button>
                                </div>
                        }
                        
                    </button>

                    <NavLink
                        to={"/saved"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {({ isActive }) => (
                            <>
                                {isActive ? <FaBookmark size={25} /> : <FaRegBookmark size={25} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Saved</p>
                            </>
                        )}
                    </NavLink>

                    {
                        user && (
                            <button onClick={()=>setCreatepostModal(true)} className='text-xl font-medium px-10 py-3 cursor-pointer mt-4 rounded-full border-2 border-[#d75f41] text-[#d75f41]  hover:bg-[#d75f41] hover:text-white'>Create post</button>
                        )
                    }
                    {
                        !user && (
                            <button onClick={()=>dispatch(setSigninModal(true))} className='text-xl font-medium px-16 py-3 cursor-pointer mt-4 rounded-full border-2 border-[#d75f41] text-[#d75f41]  hover:bg-[#d75f41] hover:text-white'>Sign in</button>
                        )
                    }
                </div>
            </div>
            {
                signinModal && (
                    <Signin onClose={()=>setSigninModal(false)} onOpen={()=>setSigninModal(true)}/>
                )
            }
            {
                createPostModal && (
                    <CreatePostModal onClose={()=>setCreatepostModal(false)}/>
                )
            }
            {
                logoutModal && (
                    <LogoutModal onClose={()=>setLogoutModal(false)}/>
                )
            }
        </>
    )
}

export default LeftSidebar