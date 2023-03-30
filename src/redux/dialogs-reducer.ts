import {InferActionsTypes} from "./redux-store"

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

export type InitialStateType = typeof initialState

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

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return {
                ...state,
                messagesData: [...state.messagesData, {id: state.messagesData.length + 1, message: action.newMessage}]
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessage: string) => ({type: 'SEND_MESSAGE', newMessage} as const)
}

export default dialogsReducer