const store = {
    _state: {
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
    },
    _callSubscriber() {
        console.log('state');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 4,
                message: this._state.profilePage.newPostText,
                likesCount: 15
            }
            this._state.profilePage.postsData.push(newPost);
            this._callSubscriber(this._state);
            this._state.profilePage.newPostText = '';
        }
        else if (action.type === 'UPDATE_NEW_POST_TEXT') {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

window.store = store;

export default store;