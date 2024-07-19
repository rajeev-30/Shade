import { Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AllusersCard from './AllusersCard'
import UserShimmer from './Shimmer'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/Constant'
import { getUnFollowed } from '../redux/userSlice'
import toast from 'react-hot-toast'

const RightSidebar = () => {
    const [searchBorder, setSearchBorder] = useState(false)
    const {user, allUsers,unFollowed, refresh} = useSelector(store=>store.user);
    const [searchText, setSearchText] = useState("")
    const [searchedUsers, setSearchUsers] = useState([]);
    // const [unFollowed, setUnFollowed] = useState(null)
    const dispatch = useDispatch();

    const showSearchBorder = () =>{
        setSearchBorder(true)
    }

    const searchRef = useRef();
    
    const hideSearchBorder = (e) =>{
        if(searchRef.current===e.target){
            setSearchBorder(false)
        }
    }

    useEffect(()=>{
        setSearchUsers(allUsers?.filter(currUser=>{
            if(currUser.username.includes(searchText)){
                return currUser
            }
        }))
        // console.log(searchedUsers);
    },[searchText],)


    // useEffect(()=>{
    //     setUnFollowed(allUsers?.filter(currUser=>{
    //         if(!(user?.following?.includes(currUser._id)) && user?._id!=currUser._id){
    //             return currUser
    //         }
    //     }))
    //     console.log("setUnfollowedUsers: "+unFollowed);
    // },[])

    const fetchUnFollowed = async() =>{
        try {
            const res =  await axios.get(`${USER_API_END_POINT}/unfollowed`,{
                withCredentials: true
            })

            dispatch(getUnFollowed(res?.data?.unFollowed));
        } catch (error) {
            console.log("fetchUnFollowed: "+error);
            
        }
    }

    useEffect(()=>{
        fetchUnFollowed()
    },[])


  return (
    <div ref={searchRef} onClick={hideSearchBorder} className='w-[27%] min-h-screen max-h-full border-l border-gray-800 pl-4  pr-12  focus:bg-red-400'>
        <div className=' sticky top-0 py-4'>
            <div onClick={showSearchBorder} className={`w-full flex gap-2 bg-gray-800 bg-opacity-50 px-4 py-3 rounded-full ${searchBorder? "border border-[#d75f41]":"border border-gray-800 border-opacity-50"}`}>
                <div className='flex items-center'>
                    <Search size={16}/>
                </div>
                <input 
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    className='w-full bg-gray-800 bg-opacity-0 outline-none ' 
                    type="text" 
                    placeholder='Search users'/>
            </div>

            <div className='w-full max-h-96 my-6 bg-gray-800 bg-opacity-50 rounded-xl py-2 overflow-scroll'>
                {
                    !searchText &&(
                        // allUsers?.map(currUser => currUser?._id === user?._id?(""):(<div key={currUser?._id}> <AllusersCard singleUser={currUser}/> </div> ))
                        <>
                            <div className='px-4 pb-4 font-bold text-lg'>Users you can follow</div>
                            { unFollowed?.map(currUser => <div key={currUser?._id}> <AllusersCard singleUser={currUser}/> </div> ) }
                        </>
                    ) 
                }
                {/* {
                    user?.following?.length==0 && (
                        <>
                            <div className='px-4 pb-4 font-bold text-lg'>Users you can follow</div>
                            {allUsers?.map(currUser => currUser?._id === user?._id?(""):(<div key={currUser?._id}> <AllusersCard singleUser={currUser}/> </div> ))}
                        </>
                    )
                } */}
                {
                    !user &&  !searchText && (
                        allUsers?.map(currUser => currUser?._id === user?._id?(""):(<div key={currUser?._id}> <AllusersCard singleUser={currUser}/> </div> ))
                    )
                }
                {
                    searchText && searchedUsers?.length===0 && (
                        <div className='p-4'>
                            user not found!
                        </div>
                    )
                }
                {
                    searchText && searchedUsers?.length>0 && (
                        searchedUsers?.map(user=><div key={user?._id} ><AllusersCard singleUser={user}/></div> )
                    )
                }


                    {/* Shimmer Effect */}
                {
                    (!unFollowed && user) &&(
                        <>
                        <UserShimmer/>
                        <UserShimmer/>
                        <UserShimmer/>
                        <UserShimmer/>
                        <UserShimmer/>
                        <UserShimmer/>
                        </>
                    )
                } 
            </div>
        </div>
    </div>
  )
}

export default RightSidebar