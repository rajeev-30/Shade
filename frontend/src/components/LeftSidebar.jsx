import { Home, Search, User, Settings, Store, LogOut } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Signin from './SignIn';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getProfile, getUser, setSigninModal } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/Constant';

const LeftSidebar = () => {
    const {user, signinModal} = useSelector(store=>store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const LogoutHandler = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials: true,
            })

            dispatch(getUser(null));
            dispatch(getProfile(null));
            toast.success(res?.data?.message)
            navigate('/');
        } catch (error) {
            console.log("Logout Errorr: "+error);

            if(error?.response?.data?.isLoginRequired){
                dispatch(setSigninModal(true));
                navigate('/');
            }
        }
    }
    return (
        <>
            <div className='w-[27%] h-full pl-32 pt-8 border-r border-gray-800 fixed'>
                <div>
                    <NavLink 
                        to={"/"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15`}
                    >
                        <Home size={25} /> <p className="text-xl font-medium">Home</p>
                    </NavLink>

                    <NavLink
                        to={"/search"}
                        // onClick={user? <></> : signinModalHandler}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 `}
                    >
                        <Search size={25} /> <p className="text-xl font-medium">Search</p>
                    </NavLink>

                    <NavLink to={`/profile/${user?._id}`}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 `}
                    >
                        <User size={25} /> <p className="text-xl font-medium">Profile</p>
                    </NavLink>

                    <button
                        onClick={LogoutHandler}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 `}
                    >
                        {/* <Settings size={25} />  */}
                        <LogOut size={25}/>
                        <p className="text-xl font-medium">Logout</p>
                    </button>

                    <NavLink
                        to={"/about"}
                        className={`w-fit flex gap-5 cursor-pointer py-4 px-6 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 `}
                    >
                        <Store size={25} /> <p className="text-xl font-medium">About Us</p>
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