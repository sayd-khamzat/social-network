import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD_POST';
const SET_MY_PROFILE = 'profile/SET_MY_PROFILE';
const SET_MY_STATUS = 'profile/SET_MY_STATUS';
const SAVE_PHOTO = 'profile/SAVE_PHOTO';

const initialState = {
    postsData: [
        {id: 1, message: 'Post 1', likesCount: 10},
        {id: 2, message: 'Post 2', likesCount: 15},
        {id: 3, message: 'Post 3', likesCount: 30}
    ],
    myProfile: null,
    myStatus: ""
}

const profileReducer = (state = initialState, action) => {
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
                myProfile: {...state.myProfile, photos: action.photos}
            }
        default:
            return state;
    }
}

export const addPostAC = (postText) => ({type: ADD_POST, postText});
const setMyProfileAC = (myProfile) => ({type: SET_MY_PROFILE, myProfile});
const setMyStatusAC = (status) => ({type: SET_MY_STATUS, status});
const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO, photos})

export const getMyProfileTC = () => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.getProfile(userId);
    dispatch(setMyProfileAC(response));
}

export const getMyStatusTC = () => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.getStatus(userId);
    dispatch(setMyStatusAC(response));
}

export const updateStatusTC = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
        dispatch(getMyStatusTC());
    }
}

export const savePhotoTC = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export default profileReducer;