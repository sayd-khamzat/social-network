import {APIResponseType, ResultCodesEnum} from "../api/api"
import {ProfileType, UserType} from "../types/types"
import {Dispatch} from "redux"
import {BaseThunkType, InferActionsTypes} from "./redux-store"
import {usersAPI} from "../api/users-api"
import {profileAPI} from "../api/profile-api"

type InitialStateType = typeof initialState

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

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalItemsCount: action.totalCount
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'SET_USER_PROFILE':
            return {
                ...state,
                userProfile: action.userProfile
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SET_USER_STATUS':
            return {
                ...state,
                userStatus: action.status
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    follow: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unFollow: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    setCurrentPage: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    setUserProfile: (userProfile: ProfileType) => ({type: 'SET_USER_PROFILE', userProfile} as const),
    toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', followingInProgress, userId} as const),
    setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', status} as const)
}

//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

export const getUsersTC = (pageSize: number, currentPage: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    const data = await usersAPI.getUsers(pageSize, currentPage)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
    dispatch(actions.toggleIsFetching(false))
}

export const pageChangedTC = (pageSize: number, pageNumber: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(pageNumber))
    const data = await usersAPI.getUsers(pageSize, pageNumber)
    dispatch(actions.setUsers(data.items))
    dispatch(actions.toggleIsFetching(false))
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

export const followTC = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(userId, dispatch, usersAPI.follow, actions.follow)
}

export const unFollowTC = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(userId, dispatch, usersAPI.unFollow, actions.unFollow)
}

const _followUnfollowFlow = async (userId: number, dispatch: Dispatch<ActionsTypes>,
                                   apiMethod: (userId: number) => Promise<APIResponseType>,
                                   actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const getUserProfileTC = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatusTC = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserStatus(data))
}

export default usersReducer