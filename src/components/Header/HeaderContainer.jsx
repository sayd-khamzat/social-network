import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getAuthUserDataTC, logoutTC} from "../../redux/auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {

    useEffect(() => {
        props.getAuthUserData();
    }, [])

    return (
        <Header isAuth={props.isAuth} login={props.login} logout={props.logout}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {getAuthUserData: getAuthUserDataTC, logout: logoutTC})
(HeaderContainer);