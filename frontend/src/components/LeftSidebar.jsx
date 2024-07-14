import { Home, Search, User, Settings, Store } from 'lucide-react'
import React, { useState } from 'react'

const LeftSidebar = () => {
    const [activeButton, setActiveButton] = useState('home');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div className='w-[27%] min-h-screen max-h-full pl-32 pt-8 border-r border-gray-800 fixed'>
            <div>
                <button
                    onFocus={() => handleButtonClick('home')}
                    className={`flex gap-5 cursor-pointer p-4 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 ${activeButton === 'home' ? 'bg-gray-600 bg-opacity-15' : ''}`}
                >
                    <Home size={25} /> <p className="text-xl font-medium">Home</p>
                </button>

                <button
                    onFocus={() => handleButtonClick('search')}
                    className={`flex gap-5 cursor-pointer p-4 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 ${activeButton === 'search' ? 'bg-gray-600 bg-opacity-15': ''}`}
                >
                    <Search size={25} /> <p className="text-xl font-medium">Search</p>
                </button>

                <button
                    onFocus={() => handleButtonClick('profile')}
                    className={`flex gap-5 cursor-pointer p-4 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 ${activeButton === 'profile' ? 'bg-gray-600 bg-opacity-15'  : ''}`}
                >
                    <User size={25} /> <p className="text-xl font-medium">Profile</p>
                </button>

                <button
                    onFocus={() => handleButtonClick('settings')}
                    className={`flex gap-5 cursor-pointer p-4 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 ${activeButton === 'settings' ? 'bg-gray-600 bg-opacity-15'  : ''}`}
                >
                    <Settings size={25} /> <p className="text-xl font-medium">Settings</p>
                </button>

                <button
                    onFocus={() => handleButtonClick('about')}
                    className={`flex gap-5 cursor-pointer p-4 mb-2 rounded-full hover:bg-gray-600 hover:bg-opacity-15 ${activeButton === 'about' ? 'bg-gray-600 bg-opacity-15'  : ''}`}
                >
                    <Store size={25} /> <p className="text-xl font-medium">About Us</p>
                </button>

                <button className='text-xl font-medium px-10 py-3 cursor-pointer mt-4 rounded-full border-2 border-[#d75f41] text-[#d75f41]  hover:bg-[#d75f41] hover:text-white'>Create post</button>
            </div>
        </div>
    )
}

export default LeftSidebar