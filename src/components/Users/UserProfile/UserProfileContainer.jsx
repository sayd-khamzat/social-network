import React, {useEffect} from "react";
import UserProfile from "./UserProfile";
import {getUserProfileTC} from "../../../redux/users-reducer";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {getUserStatusTC} from "../../../redux/users-reducer";

const UserProfileContainer = (props) => {

    const {userId} = useParams();

    useEffect(() => {
        props.getUserProfile(userId);
        props.getUserStatus(userId)
    }, [])

    return (
        (!props.userProfile
            ? <Preloader/>
            : <UserProfile userProfile={props.userProfile}
                           userStatus={props.userStatus}/>)
    );
}

const mapStateToProps = (state) => ({
    userProfile: state.usersPage.userProfile,
    userStatus: state.usersPage.userStatus
})

export default connect(mapStateToProps, {
        getUserProfile: getUserProfileTC,
        getUserStatus: getUserStatusTC
    })
(UserProfileContainer);