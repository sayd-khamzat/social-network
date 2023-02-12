const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const initialState = {
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

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const newMessage = {
                id: state.messagesData.length + 1,
                message: state.newMessageText
            }
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessage;
            return state;
        default:
            return state;
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextAC = (newMessage) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage});

export default dialogsReducer;