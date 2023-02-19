import React from "react";
import {connect} from "react-redux";
import {setUserDataAC} from "../../redux/auth-reducer";
import Header from "./Header";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component {

    componentDidMount() {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    const {id, email, login} = data.data
                    this.props.setUserData(id, email, login)
                }
            })
    }

    render() {
        return (
            <Header isAuth={this.props.isAuth} login={this.props.login}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps,
    {setUserData: setUserDataAC})
(HeaderContainer);