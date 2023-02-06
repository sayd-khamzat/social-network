let rerenderEntireTree = () => {
    console.log('state')
}

const state = {
    profilePage: {
        postsData: [
            {id: 1, message: "Post 1", likesCount: 10},
            {id: 2, message: "Post 2", likesCount: 15},
            {id: 3, message: "Post 3", likesCount: 30}
        ],
        newPostText: 'New Post'
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

window.state = state;

export const addPost = () => {
    const newPost = {
        id: 4,
        message: state.profilePage.newPostText,
        likesCount: 15
    }
    state.profilePage.postsData.push(newPost);
    rerenderEntireTree(state);
    state.profilePage.newPostText = '';
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
}

export default state;