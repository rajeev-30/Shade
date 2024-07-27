import { CircleAlert, Eye, EyeOff, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '../../utils/Constant';
import axios from 'axios';
import { getRefresh } from '../../redux/userSlice';
import toast from 'react-hot-toast';

const UpdateProfile = ({onClose}) => {
    const {user} = useSelector(store=>store.user);
    const [username, setUsername] = useState(user?.username);
    const [profession, setProfession] = useState(user?.profession);
    const [bio, setBio] = useState(user?.bio);
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const modalRef = useRef();
    const dispatch = useDispatch();
    const [loading, setIsLoading] = useState();
    const closeModal = (e)=>{
        if(modalRef.current==e.target){
            onClose()
        }
    }
    
    const updateProfileHandler = async() => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${USER_API_END_POINT}/updateprofile`,
            {username,profession,bio,password},{
                withCredentials: true, 
            })
            dispatch(getRefresh());
            onClose();
            toast.success(res.data.message);
        } catch (error) {
            console.log("updateProfileHandler error: " + error);
            toast.error(error?.response?.data?.message);
        }finally{
            setIsLoading(false)
        }
    }
  return (
    <div ref={modalRef} onClick={closeModal} className='z-10 fixed h-screen w-full flex items-center justify-center bg-[#0F172A] bg-opacity-30 backdrop-blur-sm'>
        <div className='w-[42%] h-[88%] p-6 border border-[#d75f41] rounded-xl bg-[#0F172A] overflow-scroll'>

            <div className='flex justify-between'>
                <div className='flex gap-8 items-center'>

                    <button
                        onClick={()=>onClose()}
                    >
                        <X/>
                    </button>
                    <p className='text-xl'>Edit Profile</p>

                </div>

                <button 
                    onClick={updateProfileHandler}
                    className='bg-[#d75f41] py-2 px-6 rounded-full text-sm font-semibold'>
                    {loading?"Saving...":"Save"}
                </button>
            </div>

            <div className='flex flex-col items-center py-4'>
                    <img src={`${user?.avatar}`} alt="" width={100} />

                    <div className='flex gap-2 items items-center pt-4'>
                        <CircleAlert size={13} color='gray'/>
                        <p className='text-gray-400 text-xs'>You cannot change your avatar</p>
                    </div>
            </div>

            <div className='py-4'>
                <div className='text-xs font-semibold text-gray-400'>Username</div>
                <input 
                    type="text" 
                    required={true}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className='w-full bg-inherit bg-opacity-0 border-b border-gray-800 py-4 outline-none placeholder:opacity-20'
                    placeholder='Anonymous username'
                />
            </div>
            
            <div className='py-4'>
                <div className='text-xs font-semibold text-gray-400'>Profession</div>
                <input 
                    type="text" 
                    value={profession}
                    onChange={(e)=>setProfession(e.target.value)}
                    className='w-full bg-inherit bg-opacity-0 border-b border-gray-800 py-4 outline-none placeholder:opacity-20'
                    placeholder='Eg: Engineer, Founder, Student...'
                />
            </div>

            <div className='py-4'>
                <div className='text-xs font-semibold text-gray-400'>Bio</div>
                <input 
                    type="text" 
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                    className='w-full bg-inherit bg-opacity-0 border-b border-gray-800 py-4 outline-none placeholder:opacity-20'
                    placeholder='Something about yourself'
                />
            </div>

            <div className='py-4'>
                <div className='text-xs font-semibold text-gray-400'>New Password</div>
                <div className='flex items-center border-b border-gray-800'>
                    <input 
                        type={`${showPass?"text":"password"}`} 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className='w-full bg-inherit bg-opacity-0  py-4 outline-none placeholder:opacity-20'
                        placeholder='Choose a new password'
                    />
                    <div  onClick={ () => setShowPass(!showPass) } className='cursor-pointer'>
                            { showPass ? <Eye/> : <EyeOff/> }
                    </div>
                </div>
            </div>

            <div className='py-4'>
                <div className='text-xs font-semibold text-gray-400'>Gender</div>
                <input 
                    disabled
                    type="text" 
                    value={user?.gender}
                    className='w-full bg-inherit bg-opacity-0 border-b border-gray-800 py-4 cursor-not-allowed outline-none'
                />
                <p className='text-xs text-gray-400 pt-2'>Once you choose a gender, you cannot change it.</p>
            </div>
            
        </div>
    </div>
  )
}

export default UpdateProfile