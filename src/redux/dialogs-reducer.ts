const SEND_MESSAGE = 'dialogs/SEND_MESSAGE'

// export type InitialStateType = {
//     dialogsData: Array<DialogType>
//     messagesData: Array<MessageType>
// }
type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

const initialState = {
    dialogsData: [
        {id: 1, name: 'Tadaev'},
        {id: 2, name: 'Sayd-Khamzat'},
        {id: 3, name: 'Sayd-Emievich'}
    ] as Array<DialogType>,
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'S-KH'},
        {id: 3, message: 'You'}
    ] as Array<MessageType>
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {id: state.messagesData.length + 1, message: action.newMessage}]
            }
        default:
            return state
    }
}

type ActionsTypes = SendMessageType

type SendMessageType = {
    type: typeof SEND_MESSAGE
    newMessage: string
}

export const sendMessageAC = (newMessage: string): SendMessageType => ({type: SEND_MESSAGE, newMessage})

export default dialogsReducer