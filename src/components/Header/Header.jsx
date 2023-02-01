import React from "react";
import logo from "../../logo.svg";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} className={styles.appLogo} alt='logo'/>
        </header>
    )
}

export default Header;