import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getMyProfileTC, getMyStatusTC, updateStatusTC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getMyProfile()
    }

    render() {
        return (
            (!this.props.myProfile
                ? <Preloader/>
                : <Profile myProfile={this.props.myProfile}
                           myStatus={this.props.myStatus}
                           getMyStatus={this.props.getMyStatus}
                           updateStatus={this.props.updateStatus}/>)
        );
    }
}

const mapStateToProps = (state) => ({
    myProfile: state.profilePage.myProfile,
    myStatus: state.profilePage.myStatus
})

export default compose
(connect(mapStateToProps, {getMyProfile: getMyProfileTC,
        getMyStatus: getMyStatusTC, updateStatus: updateStatusTC}),
    withAuthRedirect)(ProfileContainer);