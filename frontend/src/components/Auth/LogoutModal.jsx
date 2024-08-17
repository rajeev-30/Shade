import axios from 'axios'
import { X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRefresh, setSigninModal } from '../../redux/userSlice'
import { USER_API_END_POINT } from '../../utils/Constant'

const LogoutModal = ({onClose}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutHandler = async() =>{
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{
                withCredentials: true,
            })

            // dispatch(getUnFollowed(null));
            dispatch(getRefresh())
            // toast.success(res?.data?.message)
            navigate('/');
            onClose();
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
        <div className='z-10 fixed w-full h-screen flex items-center justify-center bg-black backdrop-blur-sm bg-opacity-15'>
            <div className='p-6 w-[36%] h-[31%] border border-[#d75f41] bg-[#0F172A] rounded-xl overflow-scroll'>
                <div className='flex justify-between'>
                    <div className='font-semibold'> Confirmation </div>
                    <div 
                        className='cursor-pointer' 
                        onClick={() => onClose()} > 
                            <X/> 
                    </div>
                </div>

                <div className='text-s text-gray-400 pt-14 text-center'>
                    Are you sure? You want to Logout!
                </div>

                <div className='flex justify-end gap-4 pt-14'>
                    <button
                        onClick={() => onClose()} 
                        className='text-sm font-semibold bg-gray-800 px-4 py-2 rounded-md'>
                            CANCEL
                    </button>
                    <button
                        onClick={LogoutHandler} 
                        className='text-sm font-semibold bg-red-600 px-4 py-2 rounded-md'>
                            LOGOUT
                    </button>
                </div>

            </div>
        </div>
    )
}

export default LogoutModal