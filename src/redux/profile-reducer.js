import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD_POST';
const SET_MY_PROFILE = 'profile/SET_MY_PROFILE';
const SET_MY_STATUS = 'profile/SET_MY_STATUS';

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
        default:
            return state;
    }
}

export const addPostAC = (postText) => ({type: ADD_POST, postText});
export const setMyProfileAC = (myProfile) => ({type: SET_MY_PROFILE, myProfile});
export const setMyStatusAC = (status) => ({type: SET_MY_STATUS, status});

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

export default profileReducer;