import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false
}

export default function AppReducer (state = initialState, action) {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializedAppTC = () => (dispatch) => {
    const promise = dispatch(getAuthUserDataTC());
    //делается это для того, чтобы ждать пока получим данные пользователя
    Promise.all([promise]) //promise.All нужен, если есть несколько промисов, и их нужно добавить в массив
        .then(() => {
            dispatch(initializedSuccess());
        })
}