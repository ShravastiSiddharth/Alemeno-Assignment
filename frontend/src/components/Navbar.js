// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-extrabold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
