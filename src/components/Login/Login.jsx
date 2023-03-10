import React from "react";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm/LoginForm";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

const Login = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.loginBlock}>
            <h1>Log In</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps,
    {login: loginTC})(Login);