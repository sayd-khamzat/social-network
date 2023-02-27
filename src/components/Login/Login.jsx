import React from "react";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    return (
        <div className={styles.loginBlock}>
            <h1>Log In</h1>
            <LoginForm onSubmit={onSubmit}/>
        </div>
    );
}

export default connect(null,
    {login: loginTC})(Login);