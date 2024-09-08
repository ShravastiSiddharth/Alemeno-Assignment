import {
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    SET_SEARCH_TERM,
    COURSE_FILTERED_SUCCESS,
    CLEAR_COURSES,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAIL,
    COURSE_COMPLETE_SUCCESS,
  } from '../constants/courseConstants';
  
  const initialState = {
    courses: [],
    course: {},
    searchTerm: '',
    filteredCourses: [],
    hasMore: true, // Assume there are more courses initially
    error: null,
  };
  
  export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case COURSE_LIST_SUCCESS:
        return {
          ...state,
          courses: [...state.courses, ...action.payload.courses], // Append new courses
          filteredCourses: [...state.filteredCourses, ...action.payload.courses], // Append to filtered
          hasMore: action.payload.hasMore,
        };
      case COURSE_LIST_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case COURSE_DETAILS_SUCCESS:
        return {
          ...state,
          course: action.payload,
        };
      case COURSE_DETAILS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case SET_SEARCH_TERM:
        return {
          ...state,
          searchTerm: action.payload,
        };
      case COURSE_FILTERED_SUCCESS:
        return {
          ...state,
          filteredCourses: action.payload,
        };
     

    case CLEAR_COURSES: 
    return {
      ...state,
      courses: [],
      filteredCourses: [],
      searchTerm: '',
    };
    case FETCH_COURSES_SUCCESS:
      return {
          ...state,
          courses: action.payload
      };
  case FETCH_COURSES_FAIL:
      return {
          ...state,
          error: action.payload
      };
  case COURSE_COMPLETE_SUCCESS:
      return {
          ...state,
          courses: state.courses.map(course =>
              course._id === action.payload ? { ...course, progress: 100 } : course
          )
      };
    default:
      return state;
  }

  };
  