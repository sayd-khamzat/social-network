import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileTC, getMyStatusTC, updateStatusTC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const ProfileContainer = (props) => {

    useEffect(() => {
        props.getMyProfile();
        props.getMyStatus();
    }, [])

    return (
        (!props.myProfile
            ? <Preloader/>
            : <Profile myProfile={props.myProfile}
                       myStatus={props.myStatus}
                       updateStatus={props.updateStatus}/>)
    );
}

const mapStateToProps = (state) => ({
    myProfile: state.profilePage.myProfile,
    myStatus: state.profilePage.myStatus
})

export default compose
(connect(mapStateToProps, {
        getMyProfile: getMyProfileTC,
        getMyStatus: getMyStatusTC, updateStatus: updateStatusTC
    }),
    withAuthRedirect)(ProfileContainer);