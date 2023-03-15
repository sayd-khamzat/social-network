import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'profile/ADD_POST'
const SET_MY_PROFILE = 'profile/SET_MY_PROFILE'
const SET_MY_STATUS = 'profile/SET_MY_STATUS'
const SAVE_PHOTO = 'profile/SAVE_PHOTO'

const initialState = {
    postsData: [
        {id: 1, message: 'Post 1', likesCount: 10},
        {id: 2, message: 'Post 2', likesCount: 15},
        {id: 3, message: 'Post 3', likesCount: 30}
    ] as Array<PostType>,
    myProfile: null as ProfileType | null,
    myStatus: ''
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {id: state.postsData.length + 1, message: action.postText, likesCount: 15}]
            }
        case SET_MY_PROFILE:
            return {
                ...state,
                myProfile: action.myProfile
            }
        case SET_MY_STATUS:
            return {
                ...state,
                myStatus: action.status
            }
        case SAVE_PHOTO:
            return {
                ...state,
                myProfile: {...state.myProfile, photos: action.photos} as ProfileType //так делать нехорошо
            }
        default:
            return state
    }
}

type ActionsTypes = AddPostType | SetMyProfileType | SetMyStatusType | SavePhotoSuccessType

type AddPostType = {
    type: typeof ADD_POST
    postText: string
}
type SetMyProfileType = {
    type: typeof SET_MY_PROFILE
    myProfile: ProfileType
}
type SetMyStatusType = {
    type: typeof SET_MY_STATUS
    status: string
}
type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}

export const addPostAC = (postText: string): AddPostType => ({type: ADD_POST, postText})
const setMyProfileAC = (myProfile: ProfileType): SetMyProfileType => ({type: SET_MY_PROFILE, myProfile})
const setMyStatusAC = (status: string): SetMyStatusType => ({type: SET_MY_STATUS, status})
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO, photos})

export const getMyProfileTC = () => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.getProfile(userId)
    dispatch(setMyProfileAC(response))
}

export const getMyStatusTC = () => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.getStatus(userId)
    dispatch(setMyStatusAC(response))
}

export const updateStatusTC = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(getMyStatusTC())
    }
}

export const savePhotoTC = (file: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileTC = (profile: any) => async (dispatch: any) => {
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getMyProfileTC())
    } else {
        // dispatch(stopSubmit("editProfile", {"contacts": {"facebook": response.data.messages[0]}})) //для определенного поля
        dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]})) //общая ошибка
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer