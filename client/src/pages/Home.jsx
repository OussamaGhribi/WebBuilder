import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import axios from 'axios';

const Home = () => {
  const { backendUrl, isLoggedin, setIsLoggedin, userData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();
  
  // State to manage dropdown visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (isLoggedin) {
      navigate("/get-started");
    } else {
      navigate("/login");
    }
  };

  const logout = async () => {
    try {
      await axios.post(backendUrl + '/api/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("userData");
      setIsLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] text-gray-900 scroll-smooth">
      
      {/* Navbar */}
      <header className="flex justify-between items-center py-5 px-8 sm:px-20 bg-white shadow-md fixed w-full z-50">
        <div className="flex items-center gap-3">
          <img src={assets.logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-xl">SiteBuilder</span>
        </div>

        {userData ? (
          <div className="relative">
            <div 
              className="w-10 h-10 flex justify-center items-center bg-black text-white rounded-full text-lg font-semibold cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle dropdown menu visibility on click
            >
              {userData.name ? userData.name.charAt(0).toUpperCase() : "A"}
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg overflow-hidden text-gray-700">
                {!userData.isAccountVerified && (
                  <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Verify Email</div>
                )}
                <div
                  onClick={logout}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all cursor-pointer"
          >
            Login
          </button>
        )}
      </header>

      {/* Rest of the page content */}
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center justify-center gap-20 px-8 sm:px-20 mt-70 pb-24">
        <div className="flex flex-col items-start max-w-2xl text-left space-y-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            {userData ? `Welcome back, ${userData.name.split(' ')[0]}!` : "Build Your Website Effortlessly"}
          </h1>
          <p className="text-gray-600 text-lg">
            Launch your online presence with the easiest website builder created by a solo passionate developer. No coding needed, just pure creativity.
          </p>
          <button
            onClick={handleGetStarted}
            className={`px-10 py-4 text-lg rounded-full font-semibold transition-all ${
              isLoggedin
                ? "bg-black text-white hover:bg-gray-700 cursor-pointer"
                : "bg-black text-white hover:bg-green-600 cursor-pointer"
            }`}
          >
            Get Started
          </button>
        </div>

        <div className="flex justify-center items-center">
          <img
            src={assets.header_img}
            alt="Header"
            className="w-72 sm:w-96 rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="px-8 sm:px-20 py-24 bg-white text-center">
        <h2 className="text-4xl font-bold mb-16">Features You'll Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-10 shadow-xl rounded-2xl hover:scale-105 transition-transform bg-gray-50 space-y-4">
            <h3 className="font-bold text-2xl">Drag & Drop Editor</h3>
            <p className="text-gray-600">
              Design your pages with ease using our powerful, intuitive editor.
            </p>
          </div>
          <div className="p-10 shadow-xl rounded-2xl hover:scale-105 transition-transform bg-gray-50 space-y-4">
            <h3 className="font-bold text-2xl">Fast Hosting</h3>
            <p className="text-gray-600">
              Blazing fast website performance with secure hosting included.
            </p>
          </div>
          <div className="p-10 shadow-xl rounded-2xl hover:scale-105 transition-transform bg-gray-50 space-y-4">
            <h3 className="font-bold text-2xl">AI Website Generation</h3>
            <p className="text-gray-600">
              Describe your idea and our AI will generate a beautiful website for you.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-8 sm:px-20 py-24 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-16">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
          <div className="text-left max-w-xs space-y-3">
            <h3 className="text-2xl font-semibold">1. Sign Up</h3>
            <p className="text-gray-600">
              Create a free account in minutes and verify your email.
            </p>
          </div>
          <div className="text-left max-w-xs space-y-3">
            <h3 className="text-2xl font-semibold">2. Start Building</h3>
            <p className="text-gray-600">
              Use our drag-and-drop editor or AI generator to build your website.
            </p>
          </div>
          <div className="text-left max-w-xs space-y-3">
            <h3 className="text-2xl font-semibold">3. Publish</h3>
            <p className="text-gray-600">
              Go live with one click! Your dream website is ready for the world.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="px-8 sm:px-20 py-24 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Building?</h2>
        <p className="text-gray-400 mb-10">Join hundreds of creators launching their websites effortlessly today.</p>
        <button
          onClick={handleGetStarted}
          className="px-12 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all text-lg"
        >
          {isLoggedin ? "Go to Dashboard" : "Get Started Now"}
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} SiteBuilder. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;
