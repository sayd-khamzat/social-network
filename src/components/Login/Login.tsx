import React from "react"
import styles from "./Login.module.css"
import LoginForm, {LoginFormValuesType} from "./LoginForm/LoginForm"
import {connect} from "react-redux"
import {loginTC} from "../../redux/auth-reducer"
import {Navigate} from "react-router-dom"
import {AppStateType} from "../../redux/redux-store"

type OwnPropsType = {
    captchaUrl: string | null
}
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const Login: React.FC<OwnPropsType & MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={styles.loginBlock}>
            <h1>Log In</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps,
    {login: loginTC})(Login)