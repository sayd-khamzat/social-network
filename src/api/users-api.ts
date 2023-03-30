import {APIResponseType, GetItemsResponseType, instance} from "./api"

export const usersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetItemsResponseType>(`/users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    },
    unFollow(userId: number) {
        return instance.delete<APIResponseType>(`/follow/${userId}`)
            .then(response => response.data)
    }
}