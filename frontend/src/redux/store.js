import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { courseReducer } from './reducers/courseReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    courses: courseReducer,
});

// No need to explicitly apply middleware, since `@reduxjs/toolkit` handles thunk automatically
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development mode
});

export default store;
