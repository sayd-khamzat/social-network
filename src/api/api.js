import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    withCredentials: true,
    headers: {
        'API-KEY': 'ddb557ef-b198-4d02-b5b6-6c0909a9b4a3'
    }
})

export const usersAPI = {
    getUsers(pageSize, currentPage) {
        return instance.get(`/users?count=${pageSize}&page=${currentPage}`)
            .then(response => response.data)
    },
    follow(userId) {
        return instance.post(`/follow/${userId}`)
            .then(response => response.data)
    },
    unFollow(userId) {
        return instance.delete(`/follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`/profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {status: status})
            .then(response => response.data)
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`/profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get(`/auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, {email: email, password: password, rememberMe: rememberMe})
            .then(response => response.data)
    },
    logout() {
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
}