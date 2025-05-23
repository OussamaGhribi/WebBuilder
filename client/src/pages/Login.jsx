import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password });
        
        if (data.success) {
          setIsLoggedin(true);
          setState('Login');
          getUserData(); 
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password });

        if (data.success) {
          setIsLoggedin(true);
          toast.success('account created with success')
          getUserData();  // Fetch user data after successful login
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleState = () => {
    setState(state === "Sign Up" ? "Login" : "Sign Up");
  };

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img 
        src={assets.logo} 
        onClick={() => navigate('/')} 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' 
        alt="Logo" 
      />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-l'>
        <h2 className="mb-3 text-3xl font-semibold text-white text-center">
          {state === 'Sign Up' ? "Create account" : "Login"}
        </h2>
        <p className="mb-6 text-center text-sm">
          {state === 'Sign Up' ? "Create your account" : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="Person Icon" />
              <input
                onChange={e => setName(e.target.value)} 
                value={name}
                type="text"
                placeholder='Full Name'
                className='bg-transparent outline-none w-full text-white placeholder:text-gray-400'
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Mail Icon" />
            <input
              onChange={e => setEmail(e.target.value)} 
              type="email"
              placeholder='Email'
              className='bg-transparent outline-none w-full text-white placeholder:text-gray-400'
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="Lock Icon" />
            <input
              onChange={e => setPassword(e.target.value)} 
              type="password"
              placeholder='Password'
              className='bg-transparent outline-none w-full text-white placeholder:text-gray-400'
              required
            />
          </div>
          <p onClick={() => navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer hover:text-white'>
            Forgot password?
          </p>
          <button className='w-full py-2.5 cursor-pointer transition-all rounded-full bg-gradient-to-r from-indigo-400 to-indigo-900 text-white font-medium'>
            {state}
          </button>
        </form>

        <p className='text-gray-300 text-center text-xs mt-5'>
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleState} className='text-blue-400 cursor-pointer underline'>
            {state === "Sign Up" ? "Login Here!" : "Sign up Here!"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
