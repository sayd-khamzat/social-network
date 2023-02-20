const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [],
    totalItemsCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    userProfile: null,
    followingInProgress: []
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

export default usersReducer;