import {createSelector} from "reselect"
import {AppStateType} from "../redux-store"

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true) //если не использовать
        // createSelector (reselect), то компонент рендерится при каждом
        // обновлении стейта, даже если мы на другой странице. Урок 81-83
    })

export const getTotalItemsCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}