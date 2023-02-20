import React from "react";
import {connect} from "react-redux";
import {getUserDataTC} from "../../redux/auth-reducer";
import Header from "./Header";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.getUserData();
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
    {getUserData: getUserDataTC})
(HeaderContainer);