import {authAPI} from "../api/api";

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

export const setUserDataAC = (userId, email, login,) => ({type: USER_DATA, payload: {userId, email, login, isAuth: true}});

export const getUserDataTC = () => (dispatch) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                const {id, email, login} = data.data;
                dispatch(setUserDataAC(id, email, login));
            }
        })
}

export default authReducer;