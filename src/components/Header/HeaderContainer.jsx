import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserDataTC} from "../../redux/auth-reducer";
import Header from "./Header";

const HeaderContainer = (props) => {

    useEffect(() => {
        props.getUserData();
    }, [])

    return (
        <Header isAuth={props.isAuth} login={props.login}/>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {getUserData: getUserDataTC})
(HeaderContainer);