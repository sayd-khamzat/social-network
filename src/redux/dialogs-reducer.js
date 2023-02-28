const SEND_MESSAGE = 'SEND_MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {id: state.messagesData.length + 1, message: action.newMessage}]
            }
        default:
            return state;
    }
}

export const sendMessageAC = (newMessage) => ({type: SEND_MESSAGE, newMessage});

export default dialogsReducer;