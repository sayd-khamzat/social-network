import {rerenderEntireTree} from "../render";

const state = {
    profilePage: {
        postsData: [
            {id: 1, message: "Post 1", likesCount: 10},
            {id: 2, message: "Post 2", likesCount: 15},
            {id: 3, message: "Post 3", likesCount: 30}
        ]
    },
    dialogsPage: {
        dialogsData: [
            {id: 1, name: "Tadaev"},
            {id: 2, name: "Sayd-Khamzat"},
            {id: 3, name: "Sayd-Emievich"}
        ],
        messagesData: [
            {id: 1, message: "Hi"},
            {id: 2, message: "S-KH"},
            {id: 3, message: "You"}
        ]
    }
}

window.state = state

export const addPost = (postMessage) => {
    const newPost = {
        id: 4,
        message: postMessage,
        likesCount: 15
    }
    state.profilePage.postsData.push(newPost)
    rerenderEntireTree(state)
}

export default state;