import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'Post 1', likesCount: 10},
                {id: 2, message: 'Post 2', likesCount: 15},
                {id: 3, message: 'Post 3', likesCount: 30}
            ],
            newPostText: 'New Post'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Tadaev'},
                {id: 2, name: 'Sayd-Khamzat'},
                {id: 3, name: 'Sayd-Emievich'}
            ],
            messagesData: [
                {id: 1, message: "Hi"},
                {id: 2, message: "S-KH"},
                {id: 3, message: "You"}
            ],
            newMessageText: 'New Message'
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
        // if (action.type === ADD_POST) {
        //     const newPost = {
        //         id: this._state.profilePage.postsData.length + 1,
        //         message: this._state.profilePage.newPostText,
        //         likesCount: 15
        //     }
        //     this._state.profilePage.postsData.push(newPost);
        //     this._callSubscriber(this._state);
        //     this._state.profilePage.newPostText = '';
        // }
        // else if (action.type === UPDATE_NEW_POST_TEXT) {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber(this._state);
        // }
        // else if (action.type === SEND_MESSAGE) {
        //     const newMessage = {
        //         id: this._state.dialogsPage.messagesData.length + 1,
        //         message: this._state.dialogsPage.newMessageText
        //     }
        //     this._state.dialogsPage.messagesData.push(newMessage);
        //     this._callSubscriber(this._state);
        //     this._state.dialogsPage.newMessageText = '';
        // }
        // else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
        //     this._state.dialogsPage.newMessageText = action.newMessage;
        //     this._callSubscriber(this._state);
        // }

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
}

// export const addPostAC = () => ({type: ADD_POST});
// export const updateNewPostTextAC = (newText) => ({type: UPDATE_NEW_POST_TEXT, newText});
// export const sendMessageAC = () => ({type: SEND_MESSAGE});
// export const updateNewMessageTextAC = (newMessage) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage});

window.store = store;

export default store;