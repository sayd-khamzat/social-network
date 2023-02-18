import React from "react";
import logo from "../../logo.svg";
import styles from "./Header.module.css";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={styles.header}>
            <div>
                <img src={logo} className={styles.appLogo} alt='logo'/>
            </div>
            <div className={styles.loginBlock}>
                {!props.isAuth
                    ? <NavLink to={'/login'}>
                        <button>Sign In</button>
                    </NavLink>
                    : <div>{props.login}</div>
                }
            </div>
        </header>
    )
}

export default Header;