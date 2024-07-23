import { Home, Search, User, Store, LogOut, Bell } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Signin from './SignIn';
import { NavLink, useNavigate } from 'react-router-dom';
import { getRefresh, getUnFollowed, getUser, setSigninModal } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/Constant';
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
import { SiAboutdotme } from "react-icons/si";



const LeftSidebar = () => {
    const {user, signinModal} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const LogoutHandler = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials: true,
            })

            // dispatch(getUnFollowed(null));
            dispatch(getRefresh())
            // toast.success(res?.data?.message)
            navigate('/');
        } catch (error) {
            console.log("Logout Errorr: "+error);
            // toast.error(error?.response?.data?.message);

            if(error?.response?.data?.isLoginRequired){
                dispatch(setSigninModal(true));
                navigate('/');
            }
        }
    }
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
                        onClick={LogoutHandler}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {
                            user
                                ?<div className='flex gap-5'> 
                                    <RiLogoutCircleRLine size={25}/>
                                    <p className="text-xl font-medium">Logout</p>
                                </div>
                                :<div className='flex gap-5'>
                                    <RiLoginCircleLine size={25}/>
                                    <p className="text-xl font-medium">Login</p>
                                </div>
                        }
                        
                    </button>

                    <NavLink
                        to={"/about"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-400 hover:bg-opacity-10 `}
                    >
                        {/* {({ isActive }) => (
                            <>
                                {isActive ? <IoHomeSharp size={25} /> : <IoHomeOutline size={25} />} 
                                <p className={`text-xl font-medium ${isActive ? 'font-semibold' : ''}`}>Home</p>
                            </>
                        )} */}
                        <SiAboutdotme size={25}/> <p className={`text-xl font-medium `}>About me</p>
                    </NavLink>
                    {
                        user && (
                            <button className='text-xl font-medium px-10 py-3 cursor-pointer mt-4 rounded-full border-2 border-[#d75f41] text-[#d75f41]  hover:bg-[#d75f41] hover:text-white'>Create post</button>
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
        </>
    )
}

export default LeftSidebar