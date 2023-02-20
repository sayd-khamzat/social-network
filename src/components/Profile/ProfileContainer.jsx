import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileTC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.userId;
        this.props.getMyProfile(userId)
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
    {getMyProfile: getMyProfileTC})
(ProfileContainer);