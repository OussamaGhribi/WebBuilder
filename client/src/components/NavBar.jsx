import React, { useContext } from 'react';
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NavBar = () => {
    const navigate = useNavigate();
    const {backendUrl, userData, setIsLoggedin, setUserData } = useContext(AppContext);

    /*const logout = async()=>{
      try {
        axios.defaults.withCredentials = true
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false);
        data.success && setUserData(false)
        navigate('/')
      } catch (error) {
        toast.error(error.message);
      }
    }*/
    const logout = async () => {
      try {
        await axios.post(backendUrl + '/api/auth/logout', {}, { withCredentials: true });
        localStorage.removeItem("isLoggedin");
        localStorage.removeItem("userData");
        setIsLoggedin(false);
        setUserData(null);
        toast.success("Logged out successfully!");
      } catch (error) {
        toast.error("Logout failed: " + error.message);
      }
    };

    return (
        <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
            <img src={assets.logo} className='w-28 sm:w-32' alt='Logo' />
            {userData ? (
                <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
                    {userData.name ? userData.name.charAt(0).toUpperCase() : "A"}
                    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                      <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                        {!userData.isAccountVerified && <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                        
                        <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
                      </ul>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={() => navigate('/login')} 
                    className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 
                    text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'>
                    Login <img src={assets.arrow_icon} alt="Arrow Icon" />
                </button>
            )}
        </div>
    );
};

export default NavBar;
