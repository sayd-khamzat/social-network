import React from "react";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";

const dialogsData = [
    {id: 1, name: "Tadaev"},
    {id: 2, name: "Sayd-Khamzat"},
    {id: 3, name: "Sayd-Emievich"}
]

const messagesData = [
    {id: 1, message: "Hi"},
    {id: 2, message: "S-KH"},
    {id: 3, message: "You"}
]

const dialogsElements = dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>)
const messagesElements = messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

function Dialogs(props) {
    return (
        <div className={styles.dialogsBlock}>
            <div>
                {dialogsElements}
            </div>
            <div>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;