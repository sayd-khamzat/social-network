import React from "react";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";
import {Navigate} from "react-router-dom";

function Dialogs(props) {

    const dialogsElements = props.dialogsPage.dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
    const messagesElements = props.dialogsPage.messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>);

    const sendMessage = () => {
        props.sendMessageAC();
    }

    const onMessageChange = (e) => {
        const text = e.target.value;
        props.updateNewMessageTextAC(text);
    }

    if (!props.isAuth) return <Navigate to={'/login'}/>

    return (
        <div className={styles.dialogsBlock}>
            <div>
                {dialogsElements}
            </div>
            <div>
                <div>{messagesElements}</div>
                <div>
                    <textarea value={props.dialogsPage.newMessageText}
                              onChange={onMessageChange}/>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;