import React from "react"
import styles from "./Dialogs.module.css"
import Message from "./Message/Message"
import Dialog from "./Dialog/Dialog"
import SendMessageForm, {SendMessageFormValuesType} from "./SendMessageForm/SendMessageForm"
import {InitialStateType} from "../../redux/dialogs-reducer"

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessage: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    const dialogsElements = props.dialogsPage.dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>)
    const messagesElements = props.dialogsPage.messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

    const sendMessage = (formData: SendMessageFormValuesType) => {
        props.sendMessage(formData.newMessage)
    }

    return (
        <div className={styles.dialogsBlock}>
            <div>
                {dialogsElements}
            </div>
            <div>
                <div>{messagesElements}</div>
                <div>
                    <SendMessageForm onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    )
}

export default Dialogs