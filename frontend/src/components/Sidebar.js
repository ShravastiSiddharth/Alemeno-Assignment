import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
            <h2 className="text-2xl font-bold p-4">Student Dashboard</h2>
            <nav className="flex flex-col p-4 space-y-2">
                <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">My Courses</Link>
                {/* You can add more sidebar links here */}
            </nav>
        </div>
    );
};

export default Sidebar;
