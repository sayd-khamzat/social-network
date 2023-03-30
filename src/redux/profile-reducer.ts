import {stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../types/types"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {profileAPI} from "../api/profile-api"
import {ResultCodesEnum} from "../api/api"

export type InitialStateType = typeof initialState

const initialState = {
    postsData: [
        {id: 1, message: 'Post 1', likesCount: 10},
        {id: 2, message: 'Post 2', likesCount: 15},
        {id: 3, message: 'Post 3', likesCount: 30}
    ] as Array<PostType>,
    myProfile: null as ProfileType | null,
    myStatus: ''
}

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                postsData: [...state.postsData, {id: state.postsData.length + 1, message: action.postText, likesCount: 15}]
            }
        case 'SET_MY_PROFILE':
            return {
                ...state,
                myProfile: action.myProfile
            }
        case 'SET_MY_STATUS':
            return {
                ...state,
                myStatus: action.status
            }
        case 'SAVE_PHOTO':
            return {
                ...state,
                myProfile: {...state.myProfile, photos: action.photos} as ProfileType //так делать нехорошо
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (postText: string) => ({type: 'ADD_POST', postText} as const),
    setMyProfile: (myProfile: ProfileType) => ({type: 'SET_MY_PROFILE', myProfile} as const),
    setMyStatus: (status: string) => ({type: 'SET_MY_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO', photos} as const)
}

//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getMyProfileTC = (): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setMyProfile(data))
}

export const getMyStatusTC = (): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setMyStatus(data))
}

export const updateStatusTC = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getMyStatusTC())
    }
}

export const savePhotoTC = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch) => {
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getMyProfileTC())
    } else {
        // dispatch(stopSubmit("editProfile", {"contacts": {"facebook": response.data.messages[0]}})) //для определенного поля
        // @ts-ignore
        dispatch(stopSubmit("editProfile", {_error: data.messages[0]})) //общая ошибка
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer