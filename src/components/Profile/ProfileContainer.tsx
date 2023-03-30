import React, {useEffect} from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {getMyProfileTC, getMyStatusTC, savePhotoTC, saveProfileTC, updateStatusTC} from "../../redux/profile-reducer"
import Preloader from "../common/Preloader/Preloader"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {compose} from "redux"
import {ProfileType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type MapStatePropsType = {
    myProfile: ProfileType | null
    myStatus: string
}
type MapDispatchPropsType = {
    getMyProfile: () => void
    getMyStatus: () => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type PropsType = MapStatePropsType & MapDispatchPropsType

const ProfileContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.getMyProfile()
        props.getMyStatus()
    }, [])

    return (
        (!props.myProfile
            ? <Preloader/>
            : <Profile myProfile={props.myProfile}
                       myStatus={props.myStatus}
                       updateStatus={props.updateStatus}
                       savePhoto={props.savePhoto}
                       saveProfile={props.saveProfile}/>)
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    myProfile: state.profilePage.myProfile,
    myStatus: state.profilePage.myStatus
})

export default compose<React.ComponentType>
(connect(mapStateToProps,
        {
        getMyProfile: getMyProfileTC, getMyStatus: getMyStatusTC,
        updateStatus: updateStatusTC, savePhoto: savePhotoTC,
        saveProfile: saveProfileTC
        }),
    withAuthRedirect)(ProfileContainer)