import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const USER_DATA = 'auth/USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

// export type InitialStateType = {
//     userId: number | null
//     email: string | null
//     login: string | null
//     isAuth: boolean
//     captchaUrl: string | null
// }

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

type ActionsTypes = SetUserDataType | GetCaptchaUrlSuccessType

type SetUserDataType = {
    type: typeof USER_DATA
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean
    }
}
type GetCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {
        captchaUrl: string
    }
}

export const setUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataType => ({type: USER_DATA, payload: {userId, email, login, isAuth}})
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

export const getAuthUserDataTC = () => async (dispatch: any) => {
    const response = await authAPI.me()
    if (response.resultCode === 0) {
        const {id, email, login} = response.data
        dispatch(setUserDataAC(id, email, login, true))
    }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    // @ts-ignore
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === 0) {
        dispatch(getAuthUserDataTC())
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
        const message = response.messages.length > 0 ? response.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}

export const logoutTC = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
    }
}

export const getCaptchaUrlTC = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer