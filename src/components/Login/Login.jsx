import React from "react";
import styles from "./Login.module.css"

const Login = () => {
    return (
        <div className={styles.loginBlock}>
            <h1>Log In</h1>
            <div>
                <input type={'text'} placeholder={'Email'}/>
                <br/>
                <input type={'password'} placeholder={'Password'}/>
            </div>
            <div>
                <button>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Login;