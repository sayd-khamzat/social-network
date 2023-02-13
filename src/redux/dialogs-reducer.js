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
            return {
                ...state,
                messagesData: [...state.messagesData, {id: state.messagesData.length + 1, message: state.newMessageText}],
                newMessageText: ''

            }
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage,
            }
        default:
            return state;
    }
}

export const sendMessageAC = () => ({type: SEND_MESSAGE});
export const updateNewMessageTextAC = (newMessage) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage});

export default dialogsReducer;