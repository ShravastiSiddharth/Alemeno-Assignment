import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = ({ children }) => {
    const location = useLocation();
    const shouldShowNavbar = !['/dashboard', '/another-route'].includes(location.pathname);

    return (
        <div>
            {shouldShowNavbar && <NavBar />}
            {children}
        </div>
    );
};

export default Layout;
