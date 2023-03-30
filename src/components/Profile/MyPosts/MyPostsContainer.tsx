import React from "react"
import {actions} from "../../../redux/profile-reducer"
import MyPosts, {MapDispatchPropsType, MapStatePropsType} from "./MyPosts"
import {connect} from "react-redux"
import {AppStateType} from "../../../redux/redux-store"

const mapStateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {addPost: actions.addPost})
(MyPosts)