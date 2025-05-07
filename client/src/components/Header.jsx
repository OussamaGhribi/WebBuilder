import React, { useContext } from 'react'
import { assets } from '../assets/assets' 
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";



const Header = () => {

  const {isLoggedin,userData} = useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isLoggedin) {
      navigate("/get-started");
    } else {
      toast.warn("Please log in first to continue.");
    }
  };

  return (
    <div className='flex flex-col items-center mt-0 px-4 text-center'>
        <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6' alt="Header Image" />
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
            {userData?"Welcome back "+userData.name : "Hey there"} ! 
            <img src={assets.hand_wave} className='w-8 aspect-square' alt="Wave Hand" />
        </h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our website</h2>
        <p className='mb-8 max-w-md'>
            Here you can build your own first website with our tools created by our developers (only one guy).
        </p>
        <button
        type="button"
        onClick={handleClick}
        className={`border rounded-full px-8 py-2.5 transition-all cursor-pointer ${
          isLoggedin ? "border-gray-500 hover:bg-gray-100" : "border-red-500 hover:bg-red-100"
        }`}
      >
        {isLoggedin ? "Get Started" : "Login first"}
      </button>
    </div>
  )
}

export default Header
