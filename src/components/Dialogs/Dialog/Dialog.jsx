import React from "react";
import styles from "./Dialog.module.css";
import {NavLink} from "react-router-dom";

function Dialog(props) {

    const path = '/dialogs/' + props.id

    return (
        <div>
            <div className={styles.dialog}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>
        </div>
    );
}

export default Dialog;