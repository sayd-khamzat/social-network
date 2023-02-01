import React from "react";
import styles from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to='/profile' className={navData => navData.isActive ? styles.activeLink : styles.item}>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to='/dialogs' className={navData => navData.isActive ? styles.activeLink : styles.item}>Dialogs</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;