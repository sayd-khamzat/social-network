import {getAuthUserDataTC} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

const initialState: InitialStateType = {
    initialized: false
}

export default function AppReducer (state = initialState, action: ActionsType) {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type ActionsType = InitializedSuccessType

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS // equals 'app/INITIALIZED_SUCCESS'
}

const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS})

export const initializedAppTC = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserDataTC())
    //делается это для того, чтобы ждать пока получим данные пользователя
    Promise.all([promise]) //promise.All нужен, если есть несколько промисов, и их нужно добавить в массив
        .then(() => {
            dispatch(initializedSuccess())
        })
}