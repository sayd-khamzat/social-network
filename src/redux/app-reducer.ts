import {getAuthUserDataTC} from "./auth-reducer"
import {InferActionsTypes} from "./redux-store"

type InitialStateType = typeof initialState

const initialState = {
    initialized: false
}

const AppReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const)
}

export const initializedAppTC = () => (dispatch: any) => {
    const promise = dispatch(getAuthUserDataTC())
    //делается это для того, чтобы ждать пока получим данные пользователя
    Promise.all([promise]) //promise.All нужен, если есть несколько промисов, и их нужно добавить в массив
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

export default AppReducer