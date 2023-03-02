import React from "react";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logout={props.logout}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {logout: logoutTC})
(HeaderContainer);