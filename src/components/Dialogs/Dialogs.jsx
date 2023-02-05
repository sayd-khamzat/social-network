import React from "react";
import styles from "./Dialogs.module.css";
import Message from "./Message/Message";
import Dialog from "./Dialog/Dialog";

function Dialogs(props) {
    return (
        <div className={styles.dialogsBlock}>
            <div>
                <Dialog id={1} name='Tadaev'/>
                <Dialog id={2} name='Sayd-Khamzat'/>
                <Dialog id={3} name='Sayd-Emievich'/>
            </div>
            <div>
                <Message message='Hi'/>
                <Message message='S-KH'/>
                <Message message='You'/>
            </div>
        </div>
    );
}

export default Dialogs;