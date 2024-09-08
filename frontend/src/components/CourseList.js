// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CourseCard from './CourseCard';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     loadCourses();
//   }, [page]);

//   useEffect(() => {
    
//     const filtered = courses.filter(course =>
//       course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCourses(filtered);
//   }, [searchTerm, courses]);

//   const loadCourses = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/courses`, {
//         params: { page }
//       });
//       setCourses(res.data);
//       setHasMore(res.data.length > 0);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//     setLoading(false);
//   };

//   const handleScroll = () => {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
//     setPage(prev => prev + 1);
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [loading]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div className="container mx-auto px-4">
//       <div className="my-4">
//         <input
//           type="text"
//           className="border p-2 w-full"
//           placeholder="Search courses by name or instructor"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredCourses.map(course => (
//           <CourseCard key={course._id} course={course} />
//         ))}
//       </div>
//       {loading && <p>Loading more courses...</p>}
//       {!hasMore && <p>No more courses to load.</p>}
//     </div>
//   );
// };

// export default CourseList;





import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listCourses, setSearchTerm,clearCourses } from '../redux/actions/courseActions';
import CourseCard from './CourseCard';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, filteredCourses, searchTerm, hasMore } = useSelector((state) => state.courses);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch courses when component mounts and on page change
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      await dispatch(listCourses(page));
      setLoading(false);
    };

    fetchCourses();
  }, [dispatch, page]);

  useEffect(() => {
    // Clear courses when component unmounts
    return () => {
      dispatch(clearCourses());
    };
  }, [dispatch]);
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) return;
    setPage(prevPage => prevPage + 1); // Load more courses when scrolled to bottom
  };

  // Attach scroll event listener for infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="my-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Search courses by name or instructor"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      {loading && <p>Loading more courses...</p>}
      {!hasMore && !loading && <p>No more courses to load.</p>}
    </div>
  );
};

export default CourseList;

