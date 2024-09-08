import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';

import Dashboard from './components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';


const App = () => {
   

    return (
        <Router>
            <div>
            <Layout/>
                <Routes>
                   
                    <Route path="/" element={<CourseList/>} exact />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                   
                    <Route path='/dashboard'  element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                    
                </Routes>
                </div>
        </Router>
   

    );
};

export default App;
