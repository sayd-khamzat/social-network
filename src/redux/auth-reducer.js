import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const USER_DATA = 'auth/USER_DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const setUserDataAC = (userId, email, login, isAuth) => ({type: USER_DATA, payload: {userId, email, login, isAuth}});

export const getAuthUserDataTC = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
        const {id, email, login} = response.data;
        dispatch(setUserDataAC(id, email, login, true));
    }
}

export const loginTC = (email, password, rememberMe) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe);
    if (response.resultCode === 0) {
        dispatch(getAuthUserDataTC());
    } else {
        const message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logoutTC = () => async (dispatch) => {
    const response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false));
    }
}

export default authReducer;