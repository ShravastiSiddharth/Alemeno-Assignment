import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import { fetchEnrolledCourses } from '../redux/actions/courseActions';

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.courses);

  
  useEffect(() => {
    if (userInfo) {
      dispatch(fetchEnrolledCourses());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="p-8 flex-1">
      <h2 className="text-xl mb-4">Your Enrolled Courses</h2>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default EnrolledCourses;
