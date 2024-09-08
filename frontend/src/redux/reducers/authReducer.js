import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/authConstants';

export const authReducer = (state = { userInfo:JSON.parse(localStorage.getItem('userInfo')) || null }, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return { userInfo: action.payload };
        case USER_LOGOUT:
            return { userInfo: null };
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
};


