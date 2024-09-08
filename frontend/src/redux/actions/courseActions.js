import axios from 'axios';
import {
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  SET_SEARCH_TERM,
  COURSE_FILTERED_SUCCESS,
  CLEAR_COURSES,
  COURSE_ENROLL_SUCCESS,
  COURSE_ENROLL_FAIL,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAIL,
  COURSE_COMPLETE_SUCCESS,
  COURSE_COMPLETE_FAIL,
} from '../constants/courseConstants';

export const listCourses = () => async (dispatch) => {
  try {
    const { data } = await axios.get('https://alemeno-assignment-xss2.onrender.com/api/courses');
   
    dispatch({ type: COURSE_LIST_SUCCESS, payload: {
      courses: data, 
      hasMore: data, 
    } });
  } catch (error) {
    dispatch({ type: COURSE_LIST_FAIL, payload: error.response.data.message });
  }
};

export const clearCourses = () => (dispatch) => {
  dispatch({ type: CLEAR_COURSES });
};

export const getCourseDetails = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://alemeno-assignment-xss2.onrender.com/api/courses/${id}`);
   

    dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COURSE_DETAILS_FAIL, payload: error.response.data.message });
  }
};



export const setSearchTerm = (term) => (dispatch, getState) => {
  dispatch({ type: SET_SEARCH_TERM, payload: term });

  const { courses } = getState().courses;
  const filtered = courses.filter(course =>
    course.name.toLowerCase().includes(term.toLowerCase()) ||
    course.instructor.toLowerCase().includes(term.toLowerCase())
  );
  
  dispatch({ type: COURSE_FILTERED_SUCCESS, payload: filtered });
};




export const fetchEnrolledCourses = () => async (dispatch, getState) => {
  try {
      const { auth: { userInfo } } = getState();
      const config = {
          headers: {
              Authorization: `${userInfo.token}`
          }
      };
      const { data } = await axios.get('https://alemeno-assignment-xss2.onrender.com/api/auth/enrolled', config);
      dispatch({ type: FETCH_COURSES_SUCCESS, payload: data.enrolledCourses });
      console.log(data)
      console.log("hit the api")
  } catch (error) {
      dispatch({ type: FETCH_COURSES_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const markCourseComplete = (courseId) => async (dispatch, getState) => {
  try {
      const { auth: { userInfo } } = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      };
      await axios.put(`/api/courses/${courseId}/complete`, {}, config);
      dispatch({ type: COURSE_COMPLETE_SUCCESS, payload: courseId });
  } catch (error) {
      dispatch({ type: COURSE_COMPLETE_FAIL, payload: error.response?.data.message || error.message });
  }
};

export const enrollInCourse = (courseId) => async (dispatch, getState) => {
  try {
      const { auth: { userInfo } } = getState();
      const config = {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      };
      const { data } = await axios.post(`https://alemeno-assignment-xss2.onrender.com/api/courses/enroll/${courseId}`, {}, config);
      dispatch({ type: COURSE_ENROLL_SUCCESS, payload: data });
  } catch (error) {
      dispatch({ type: COURSE_ENROLL_FAIL, payload: error.response?.data.message || error.message });
  }
};
