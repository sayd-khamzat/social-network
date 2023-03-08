import {profileAPI, usersAPI} from "../api/api";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const SET_USER_PROFILE = 'users/SET_USER_PROFILE';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_USER_STATUS = 'users/SET_USER_STATUS';

const initialState = {
    users: [],
    totalItemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    userProfile: null,
    followingInProgress: [],
    userStatus: ""
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalItemsCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            }
        default:
            return state;
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unFollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setUsersTotalCountAC = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const setCurrentPageAC = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const setUserProfileAC = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const toggleIsFollowingProgressAC = (followingInProgress, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId});
export const setUserStatusAC = (status) => ({type: SET_USER_STATUS, status});

export const getUsersTC = (pageSize, currentPage) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    const response = await usersAPI.getUsers(pageSize, currentPage);
    dispatch(setUsersAC(response.items));
    dispatch(setUsersTotalCountAC(response.totalCount));
    dispatch(toggleIsFetchingAC(false));
}

export const pageChangedTC = (pageSize, pageNumber) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    dispatch(setCurrentPageAC(pageNumber));
    const response = await usersAPI.getUsers(pageSize, pageNumber);
    dispatch(setUsersAC(response.items));
    dispatch(toggleIsFetchingAC(false));
}

// export const followTC = (userId) => async (dispatch) => {
//     dispatch(toggleIsFollowingProgressAC(true, userId));
//     const response = await usersAPI.follow(userId);
//     if (response.resultCode === 0) {
//         dispatch(followAC(userId));
//     }
//     dispatch(toggleIsFollowingProgressAC(false, userId));
// }
//
// export const unFollowTC = (userId) => async (dispatch) => {
//     dispatch(toggleIsFollowingProgressAC(true, userId));
//     const response = await usersAPI.unFollow(userId);
//     if (response.resultCode === 0) {
//         dispatch(unFollowAC(userId));
//     }
//     dispatch(toggleIsFollowingProgressAC(false, userId));
// }

export const followTC = (userId) => async (dispatch) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.follow, followAC);
}

export const unFollowTC = (userId) => async (dispatch) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.unFollow, unFollowAC);
}

const followUnfollowFlow = async (userId, dispatch, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgressAC(true, userId));
    const response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowingProgressAC(false, userId));
}

export const getUserProfileTC = (userId) => async (dispatch) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response));
}

export const getUserStatusTC = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserStatusAC(response));
}

export default usersReducer;