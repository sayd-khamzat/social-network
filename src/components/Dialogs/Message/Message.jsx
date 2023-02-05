import React from "react";
import styles from "./Message.module.css";

function Message(props) {
    return (
        <div>
            <div className={styles.message}>
                {props.message}
            </div>
        </div>
    );
}

export default Message;