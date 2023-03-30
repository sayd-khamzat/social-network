import React from "react"
import {Navigate} from "react-router-dom"
import {connect} from "react-redux"
import {AppStateType} from "../redux/redux-store"

type WCP = {} //WrappedComponentProps

type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    } as MapStatePropsType
}

export function withAuthRedirect(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!props.isAuth) {
            return <Navigate to={'/login'}/>
        }

        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<MapStatePropsType, MapDispatchPropsType, WCP, AppStateType>(mapStateToProps)(RedirectComponent)
}