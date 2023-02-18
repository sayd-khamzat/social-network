import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setMyProfileAC} from "../../redux/profile-reducer";
import Preloader from "../common/Preloader/Preloader";

class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/27055`)
            .then(response => {
                this.props.setMyProfile(response.data)
            })
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
    myProfile: state.profilePage.myProfile
})

export default connect(mapStateToProps,
    {setMyProfile: setMyProfileAC})
(ProfileContainer);