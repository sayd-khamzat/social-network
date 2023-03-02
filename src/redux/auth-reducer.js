import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const USER_DATA = 'USER_DATA';

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

export const getAuthUserDataTC = () => (dispatch) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data;
                dispatch(setUserDataAC(id, email, login, true));
            }
        })
}

export const loginTC = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getAuthUserDataTC());
            } else {
                const message = data.messages.length > 0 ? data.messages[0] : "Some error";
                dispatch(stopSubmit("login", {_error: message}));
            }
        })
}

export const logoutTC = () => (dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserDataAC(null, null, null, false));
            }
        })
}

export default authReducer;