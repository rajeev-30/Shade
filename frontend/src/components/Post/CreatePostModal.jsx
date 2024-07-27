import { Image, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import useCreatePost from '../../hooks/useCreatePost';

const CreatePostModal = ({onClose}) => {
    const modelRef = useRef(null)
    const {user} = useSelector(store=>store.user);
    const [text, setText] = useState("")
    const [img, setImg] = useState(null)
    const imgRef = useRef(null)

    const [createPost, isLoading] = useCreatePost()

    const handleCloseModal = (e) =>{
        if(modelRef.current===e.target){
            onClose();
        }
    }

    const getRowCount = () => {
        const lines = text.split('\n');
        let rowCount = lines.length;
        lines.forEach(line => {
          rowCount += Math.floor(line.length / 70); // Assume average line width is 70 characters
        });
        // Constrain the row count between 1 and 20
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
            setText(inputText);
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const render = new FileReader();
            render.onload = () => {
                setImg(render.result);
            };
            render.readAsDataURL(file);
        }
    };

    const handleImgClick = () => {
        imgRef.current.click();
    }


    const handleCreatePost = () =>{
        createPost(text, img, setText, setImg);
        onClose();
    }

    return (
        <div
            ref={modelRef}
            onClick={handleCloseModal} 
            className='fixed z-10 w-full h-screen flex justify-center items-center bg-back backdrop-blur-sm'>

            <div className='flex flex-col justify-between min-h-96 max-h-[86%] w-[44%] border border-[#d75f41] overflow-scroll bg-[#0F172A] rounded-xl'>
                <div>
                    <div className='p-4 flex justify-between border-b border-gray-800'>
                        <p className='font-semibold'>Write Post</p>
                        <X onClick={()=>onClose()} className='cursor-pointer'/>
                    </div>

                    <div className='p-4 flex items-start gap-2 '> 
                        <img src={user.avatar} alt="User Image" width={35} />

                        <textarea
                        value={text}
                        onChange={handleTextChange}
                        id="message"
                        name="message"
                        rows={getRowCount()}
                        className=" w-full mt-1 pr-4 bg-inherit  shadow-sm outline-none resize-none"
                        placeholder="Write Fearlessly..."
                    ></textarea>
                    </div>
                </div>

                {
                    img && (<>
                        <div className='flex justify-end px-4 mb-2'>
                            <X onClick={()=>{
                                setImg(null);
                                imgRef.current.value = null;
                            }} 
                            className='bg-gray-700 rounded-full p-1 cursor-pointer'/>
                        </div>
                        
                        <div className='px-4 pb-2'>
                            <img src={img} className='max-h-[600px] rounded-xl object-cover' />
                        </div>
                    </>)
                }


                <div className='relative bottom-0 p-2 flex items-center pl-12 justify-between border-t border-gray-800'>
                    <input type="file" accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
                    <Image className='cursor-pointer' onClick={handleImgClick}/>
                    <button
                        onClick={handleCreatePost} 
                        className='py-2 px-4 bg-[#d75f41] rounded-full text-sm font-semibold'>
                            Post
                        </button>
                </div>
            </div>

        </div>
    )
}

export default CreatePostModal