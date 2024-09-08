import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth);

    // If user is not logged in, redirect them to login
    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    // If user is logged in, render the children (Dashboard)
    return children;
};

export default PrivateRoute;
