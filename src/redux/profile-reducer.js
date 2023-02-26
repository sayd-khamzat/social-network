import {profileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_MY_PROFILE = 'SET_MY_PROFILE';
const SET_MY_STATUS = 'SET_MY_STATUS';

const initialState = {
    postsData: [
        {id: 1, message: 'Post 1', likesCount: 10},
        {id: 2, message: 'Post 2', likesCount: 15},
        {id: 3, message: 'Post 3', likesCount: 30}
    ],
    newPostText: 'New Post',
    myProfile: null,
    myStatus: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {id: state.postsData.length + 1, message: state.newPostText, likesCount: 15}],
                newPostText: ''
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
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

export const addPostAC = () => ({type: ADD_POST});
export const updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText});
export const setMyProfileAC = (myProfile) => ({type: SET_MY_PROFILE, myProfile});
export const setMyStatusAC = (status) => ({type: SET_MY_STATUS, status});

export const getMyProfileTC = () => (dispatch, getState) => {
    profileAPI.getProfile(getState().auth.userId)
        .then(data => dispatch(setMyProfileAC(data)));
}

export const getMyStatusTC = () => (dispatch, getState) => {
    profileAPI.getStatus(getState().auth.userId)
        .then(data => dispatch(setMyStatusAC(data)));
}

export const updateStatusTC = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(getMyStatusTC());
            }
        })
}

export default profileReducer;