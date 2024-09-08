// import React from 'react';
// import { Link } from 'react-router-dom';

// const CourseCard = ({ course }) => {
//   return (
//     <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
//       <img className="w-full h-48 object-cover" src={course.thumbnail} alt={course.name} />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{course.name}</div>
//         <p className="text-gray-700 text-base">{course.description.substring(0, 100)}...</p>
//         <div className="text-sm text-gray-600">
//           <p>Instructor: {course.instructor}</p>
//           <p>Status: {course.enrollmentStatus}</p>
//           <p>Duration: {course.duration} weeks</p>
//         </div>
//       </div>
//       <div className="px-6 pt-4 pb-2">
//         <Link to={`/courses/${course._id}`} className="text-blue-500 hover:text-blue-700">
//           View Full Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;



import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <img className="w-full h-48 object-cover" src={course.thumbnail} alt={course.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <p className="text-gray-700 text-base">{course.description.substring(0, 100)}...</p>
        <div className="text-sm text-gray-600">
          <p>Instructor: {course.instructor}</p>
          <p>Status: {course.enrollmentStatus}</p>
          <p>Duration: {course.duration} weeks</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link to={`/courses/${course._id}`} className="text-blue-500 hover:text-blue-700">
          View Full Details
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
