// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CourseDetails = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/courses/${courseId}`);
//         setCourse(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching course details:', error);
//       }
//     };
//     fetchCourse();
//   }, [courseId]);

//   if (loading) return <p>Loading course details...</p>;

//   return (
//     <div className="container mx-auto px-4">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
//         <img className="w-full h-64 object-cover mb-4" src={course.thumbnail} alt={course.name} />
//         <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
//         <p className="text-lg mb-4">{course.description}</p>
//         <p><strong>Instructor:</strong> {course.instructor}</p>
//         <p><strong>Status:</strong> {course.enrollmentStatus}</p>
//         <p><strong>Duration:</strong> {course.duration} weeks</p>
//         <p><strong>Location:</strong> {course.location}</p>
//         <h3 className="text-2xl font-bold mt-6 mb-2">Syllabus</h3>
//         <ul className="list-disc pl-6">
//           {course.syllabus.map((week, index) => (
//             <li key={index}>
//               <strong>Week {week.week}:</strong> {week.topic}
//               <p>{week.content}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;




import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../redux/actions/courseActions';

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course, loading } = useSelector((state) => state.courses);
  console.log("course: ",course)


  useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [dispatch, courseId]);

  if (loading || !course) return <p>Loading course details...</p>;

  return (
    <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
      {course.thumbnail && (
        <img className="w-full h-64 object-cover mb-4" src={course.thumbnail} alt={course.name} />
      )}
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
      <p><strong>Status:</strong> {course.enrollmentStatus}</p>
      <p><strong>Duration:</strong> {course.duration} weeks</p>
      <p><strong>Location:</strong> {course.location}</p>
      <h3 className="text-2xl font-bold mt-6 mb-2">Syllabus</h3>
      {course.syllabus && course.syllabus.length > 0 ? (
        <ul className="list-disc pl-6">
          {course.syllabus.map((week, index) => (
            <li key={index}>
              <strong>Week {week.week}:</strong> {week.topic}
              <p>{week.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No syllabus available.</p>
      )}
    </div>
  </div>
  );
};

export default CourseDetails;
