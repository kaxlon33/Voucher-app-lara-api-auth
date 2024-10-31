import React from 'react'
import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'react-use-cookie';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        removeCookie("my_token");
        navigate("/");
    };

  return (
    <button  
    onClick={handleLogout} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Log Out</button>

  )
}

export default Logout