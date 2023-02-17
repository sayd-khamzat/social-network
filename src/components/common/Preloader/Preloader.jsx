import React from "react";
import preloader from "../../../assets/images/preloader.gif";
import styles from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader} className={styles.img}/>
        </div>
    );
}

export default Preloader;