import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector,
    (users) => {
        return users.filter(u => true); //если не использовать
        // createSelector (reselect), то компонент рендерится при каждом
        // обновлении стейта, даже если мы на другой странице. Урок 81-83
    })

export const getTotalItemsCount = (state) => {
    return state.usersPage.totalItemsCount;
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}