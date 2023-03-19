import {profileAPI, usersAPI} from "../api/api";
import {ProfileType, UserType} from "../types/types";

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const SET_USER_PROFILE = 'users/SET_USER_PROFILE'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS'
const SET_USER_STATUS = 'users/SET_USER_STATUS'

const initialState = {
    users: [] as Array<UserType>,
    totalItemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    userProfile: null as ProfileType | null,
    followingInProgress: [] as Array<number>, //array of users id's
    userStatus: ''
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
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
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            }
        default:
            return state
    }
}

type ActionsTypes = FollowType | UnFollowType | SetUsersType | SetTotalUsersCountType | SetCurrentPageType |
    ToggleIsFetchingType | SetUserProfileType | ToggleIsFollowingProgressType | SetUserStatusType

type FollowType = {
    type: typeof FOLLOW
    userId: number
}
type UnFollowType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    userProfile: ProfileType
}
type ToggleIsFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    followingInProgress: boolean
    userId: number
}
type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}

const followAC = (userId: number): FollowType => ({type: FOLLOW, userId})
const unFollowAC = (userId: number): UnFollowType => ({type: UNFOLLOW, userId})
const setUsersAC = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users})
const setTotalUsersCountAC = (totalCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalCount})
const setCurrentPageAC = (pageNumber: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, pageNumber})
const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
const setUserProfileAC = (userProfile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, userProfile})
const toggleIsFollowingProgressAC = (followingInProgress: boolean, userId: number): ToggleIsFollowingProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, followingInProgress, userId})
const setUserStatusAC = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status})

export const getUsersTC = (pageSize: number, currentPage: number) => async (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true))
    const response = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(setUsersAC(response.items))
    dispatch(setTotalUsersCountAC(response.totalCount))
    dispatch(toggleIsFetchingAC(false))
}

export const pageChangedTC = (pageSize: number, pageNumber: number) => async (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(pageNumber))
    const response = await usersAPI.getUsers(pageSize, pageNumber)
    dispatch(setUsersAC(response.items))
    dispatch(toggleIsFetchingAC(false))
}

// export const followTC = (userId) => async (dispatch) => {
//     dispatch(toggleIsFollowingProgressAC(true, userId))
//     const response = await usersAPI.follow(userId)
//     if (response.resultCode === 0) {
//         dispatch(followAC(userId))
//     }
//     dispatch(toggleIsFollowingProgressAC(false, userId))
// }
//
// export const unFollowTC = (userId) => async (dispatch) => {
//     dispatch(toggleIsFollowingProgressAC(true, userId))
//     const response = await usersAPI.unFollow(userId)
//     if (response.resultCode === 0) {
//         dispatch(unFollowAC(userId))
//     }
//     dispatch(toggleIsFollowingProgressAC(false, userId))
// }

export const followTC = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.follow, followAC)
}

export const unFollowTC = (userId: number) => async (dispatch: any) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.unFollow, unFollowAC)
}

const followUnfollowFlow = async (userId: number, dispatch: any, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgressAC(true, userId))
    const response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowingProgressAC(false, userId))
}

export const getUserProfileTC = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfileAC(response))
}

export const getUserStatusTC = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatusAC(response))
}

export default usersReducer