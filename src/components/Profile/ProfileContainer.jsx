import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {setMyProfileAC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.userId;
        profileAPI.getProfile(userId)
            .then(data => this.props.setMyProfile(data))
    }

    render() {
        return (
            (!this.props.myProfile
                ? <Preloader/>
                : <Profile myProfile={this.props.myProfile}/>)
        );
    }
}

const mapStateToProps = (state) => ({
    myProfile: state.profilePage.myProfile,
    userId: state.auth.userId
})

export default connect(mapStateToProps,
    {setMyProfile: setMyProfileAC})
(ProfileContainer);