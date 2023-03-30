import React from "react"
import styles from "./Message.module.css"

type PropsType = {
    id: number
    message: string
}


const Message: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div className={styles.message}>
                {props.message}
            </div>
        </div>
    )
}

export default Message