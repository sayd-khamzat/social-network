import React, {useEffect} from "react"
import UserProfile from "./UserProfile"
import {getUserProfileTC} from "../../../redux/users-reducer"
import {connect} from "react-redux"
import {useParams} from "react-router-dom"
import Preloader from "../../common/Preloader/Preloader"
import {getUserStatusTC} from "../../../redux/users-reducer"
import {AppStateType} from "../../../redux/redux-store"
import {ProfileType} from "../../../types/types"

type MapStatePropsType = {
    userProfile: ProfileType | null
    userStatus: string
}
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const UserProfileContainer: React.FC<PropsType> = (props) => {

    const userId = +useParams() // + convert string to number

    useEffect(() => {
        props.getUserProfile(userId)
        props.getUserStatus(userId)
    }, [])

    return (
        (!props.userProfile
            ? <Preloader/>
            : <UserProfile userProfile={props.userProfile}
                           userStatus={props.userStatus}/>)
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    userProfile: state.usersPage.userProfile,
    userStatus: state.usersPage.userStatus
})

export default connect<MapStatePropsType, MapDispatchPropsType, null, AppStateType>(mapStateToProps,
    {
        getUserProfile: getUserProfileTC,
        getUserStatus: getUserStatusTC
    })(UserProfileContainer)