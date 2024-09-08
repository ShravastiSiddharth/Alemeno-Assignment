import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import CourseCard from './CourseCard';
import { fetchEnrolledCourses, markCourseComplete } from '../redux/actions/courseActions';
import EnrolledCourses from './EnrolledCourses';
import { Route, Routes, useLocation } from 'react-router-dom';
import CourseDetails from './CourseDetails';
const Dashboard = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
   

    

    // Function to mark a course as complete
    const markComplete = (courseId) => {
        dispatch(markCourseComplete(courseId));
    };
    const location = useLocation();
  const isCourseDetails = location.pathname.includes("/courses/");

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-8 flex-1">
            {isCourseDetails ? (
          <Routes>
            {/* Render CourseDetails when the user navigates to a course */}
            <Route path="/dashboard/courses/:courseId" element={<CourseDetails/>} />
          </Routes>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h1>
            <EnrolledCourses />
          </>
        )}
            </div>
        </div>
    );
};

export default Dashboard;
