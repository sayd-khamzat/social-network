import React from "react";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";

function Dialogs(props) {

    const dialogsElements = props.dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>)
    const messagesElements = props.messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

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