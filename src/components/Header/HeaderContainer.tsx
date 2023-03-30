import React from "react"
import {connect} from "react-redux"
import {logoutTC} from "../../redux/auth-reducer"
import Header from "./Header"
import {AppStateType} from "../../redux/redux-store"

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispatchPropsType = {
    logout: () => void
}

const HeaderContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return (
        <Header isAuth={props.isAuth} login={props.login} logout={props.logout}/>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {logout: logoutTC})
(HeaderContainer)