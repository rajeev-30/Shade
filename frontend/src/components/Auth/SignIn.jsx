import React, { useRef, useState } from 'react'
import {Eye, EyeOff, GraduationCap, LockKeyhole, NotebookText, SquareUser, X} from 'lucide-react'
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/Constant';
import { useDispatch } from 'react-redux';
import { getRefresh, getUser, setSigninModal } from '../../redux/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [profession, setProfession] = useState("");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const modalRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState();

    const isLoginHandler = () =>{
        setIsLogin(!isLogin)
    }


    const modalRefHanlder = (e) => {
        if(modalRef.current === e.target){
            dispatch(setSigninModal(false))
        }
    }

    const signinHandler = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        if(isLogin){
            try {
                const res = await axios.post(`${USER_API_END_POINT}/login`,
                {username, password},{
                    withCredentials:true,
                })
                dispatch(getUser(res.data.user));
                dispatch(getRefresh())
                toast.success(res.data.message);
                navigate("/");
                dispatch(setSigninModal(false));
                window.location.reload(false);

            } catch (error) {
                console.log("Login failed: "+error);
                toast.error(error?.response?.data?.message);
            }finally{
                setIsLoading(false)
            }
            
        }else{
            //Register
            try {
                const res = await axios.post(`${USER_API_END_POINT}/register`, 
                    {username, profession, bio, gender, password},{
                        withCredentials: true
                    })
                    dispatch(getUser(res.data.user));
                    dispatch(getRefresh())
                    toast.success(res.data.message);
                    navigate("/");
                    dispatch(setSigninModal(false));
                    window.location.reload(false);

            } catch (error) {
                console.log("Register failed: "+error);
                toast.error(error?.response?.data?.message);
            }finally{
                setIsLoading(false)
            }

        }
    }

  return (
    <div ref={modalRef} onClick={modalRefHanlder} className='z-10 fixed h-full w-full flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm'>
        <div className='w-1/3 min-h-[50%] max-h-[75%] overflow-scroll  border border-red-400 bg-[#0F172A] rounded-xl'>

            <div className='w-full p-6 py-6 flex justify-end gap-36'>
                <div className='text-2xl font-semibold flex justify-center'>{isLogin?"Login":"Register"}</div>
                <button onClick={()=>dispatch(setSigninModal(false))} className=''><X/></button>
            </div>

            <form className='p-4 w-full flex flex-col gap-4 justify-center items-center' 
                onSubmit={
                    signinHandler
                }>

                <div className='flex gap-3 w-3/4 py-4 px-4 bg-gray-800 bg-opacity-50 rounded-xl'>

                    <SquareUser/>
                    <input 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)} 
                        className='w-full bg-gray-800 bg-opacity-0 outline-none placeholder:opacity-20' 
                        type="text" 
                        placeholder='Anonymous username' />
                </div>
                {
                    !isLogin && (<>
                        <div className='flex gap-3 w-3/4 py-4 px-4 bg-gray-800 bg-opacity-50 rounded-xl'>

                            <GraduationCap/>
                            <input 
                                value={profession} 
                                onChange={(e)=>setProfession(e.target.value)} 
                                className='w-full bg-gray-800 bg-opacity-0 outline-none placeholder:opacity-20' 
                                type="text" 
                                placeholder='Profession eg: Engineer...' />
                        </div>

                        <div className='flex gap-3 w-3/4 py-4 px-4 bg-gray-800 bg-opacity-50 rounded-xl'>

                            <NotebookText/>
                            <input 
                                value={bio} 
                                onChange={(e)=>setBio(e.target.value)} 
                                className='w-full bg-gray-800 bg-opacity-0 outline-none placeholder:opacity-20' 
                                type="text" 
                                placeholder='Bio' />
                        </div>
                    </>)
                }
                <div className='flex gap-3 w-3/4 py-4 px-4 bg-gray-800 bg-opacity-50 rounded-xl'>

                    <LockKeyhole/>
                    <input 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        className='w-full bg-gray-800 bg-opacity-0 outline-none placeholder:opacity-20' 
                        type={`${showPass?"text":"password"}`} 
                        placeholder='Password' />

                    <div  onClick={ () => setShowPass(!showPass) } className='cursor-pointer'>
                        { showPass ? <Eye/> : <EyeOff/> }
                    </div>

                </div>
                {
                    !isLogin && (
                        <div className='flex gap-8'>

                            <div className='flex gap-2 justify-cente items-center'>
                                <label htmlFor=""> Male </label>
                                <input 
                                    checked={gender==='M'} 
                                    onChange={(e)=>setGender('M')} 
                                    type="checkbox" 
                                    defaultChecked 
                                    className="checkbox checkbox-info" />
                            </div>

                            <div className='h-10 flex gap-2 items-center'>
                                <label htmlFor=""> Female </label>
                                <input 
                                    checked={gender==='F'} 
                                    onChange={(e)=>setGender('F')} 
                                    type="checkbox" 
                                    defaultChecked 
                                    className="checkbox checkbox-info" />
                            </div>

                        </div>
                    )
                }

                <button 
                    className='w-1/2 mt-8 text-lg font-semibold bg-[#d75f41] py-3 rounded-full' 
                    type="submit"> 
                    { isLogin ? (isLoading?"Loading...":"Login") : (isLoading?"Loading...":"Register") }
                </button>

                <div className=''>
                    <p> 
                        {isLogin?"Don't have an account?":"Already Have an account?"} 
                        <span 
                            onClick={isLoginHandler} 
                            className='text-[#00B5FF] cursor-pointer'>
                            { isLogin ? " Register" : " Login" }
                        </span>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn