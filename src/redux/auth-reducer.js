import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const USER_DATA = 'auth/USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state;
    }
}

export const setUserDataAC = (userId, email, login, isAuth) => ({type: USER_DATA, payload: {userId, email, login, isAuth}});
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserDataTC = () => async (dispatch) => {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
        const {id, email, login} = response.data;
        dispatch(setUserDataAC(id, email, login, true));
    }
}

export const loginTC = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthUserDataTC());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
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

export const getCaptchaUrlTC = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;