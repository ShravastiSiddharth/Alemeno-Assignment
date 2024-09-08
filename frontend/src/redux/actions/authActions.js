import axios from 'axios';
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/authConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post('https://alemeno-assignment-xss2.onrender.com/api/auth/login', { email, password });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log(localStorage)
    } catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post('https://alemeno-assignment-xss2.onrender.com/api/auth/register', { name, email, password });

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
    }
};
