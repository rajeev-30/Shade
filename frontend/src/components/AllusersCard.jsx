import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/Constant';
import toast from 'react-hot-toast';

const AllusersCard = ({singleUser}) => {
    const {user} = useSelector(store=>store.user);

    const followAndUnFollow = async(id) =>{
        try {
            const res = await axios.post(`${USER_API_END_POINT}/followandunfollow`,{id},{
                withCredentials: true
            })
            toast.success(res.data.message);
        } catch (error) {
            console.log("FollowAndUnFollow error: " + error);
        }
    }


  return (
    <div>
        <div className='w-full flex justify-between py-2 px-4'>
                <p className='flex items-center'>{singleUser?.username}</p>
                {
                    (user?.following?.includes(singleUser._id) || user?._id===singleUser._id) && (
                        <button 
                            disabled={!user} 
                            className="px-4 py-2 bg-[#d75f41] text-xs rounded-full bg-inherit border border-[#d75f41] ">
                                Profile
                        </button>
                        // console.log(user)
                    )
                }
                {
                    !(user?.following?.includes(singleUser._id) || user?._id===singleUser._id) &&(
                        <button 
                            onClick={()=>followAndUnFollow(singleUser._id)}
                            disabled={!user} 
                            className="px-4 py-2 bg-[#d75f41] text-xs rounded-full">
                                Follow
                        </button>
                        // console.log(singleUser._id)
                    )
                }
                {/* <button 
                    disabled={!user} 
                    className={`px-4 py-2 bg-[#d75f41] text-xs rounded-full ${user?.following?.includes(singleUser._id) || user?._id===singleUser._id ?"bg-inherit border border-[#d75f41] ":""}`}>
                        {user?.following?.includes(singleUser._id) || user?._id===singleUser._id ?"Profile":"Follow"}
                </button> */}
        </div>
    </div>
  )
}

export default AllusersCard