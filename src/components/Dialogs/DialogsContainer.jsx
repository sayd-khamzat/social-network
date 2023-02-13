import React from "react";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

function DialogsContainer(props) {

    const sendMessage = () => {
        props.dispatch(sendMessageAC());
    }

    const onMessageChange = (e) => {
        const text = e.target.value;
        props.dispatch(updateNewMessageTextAC(text));
    }

    return (
        <div>
            <Dialogs dialogsPage={props.dialogsPage}
                     sendMessage={sendMessage}
                     onMessageChange={onMessageChange}/>
        </div>
    );
}

export default DialogsContainer;