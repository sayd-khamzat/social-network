import React from "react";
import UserProfile from "./UserProfile";
import {setUserProfileAC} from "../../../redux/users-reducer";
import {connect} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import {profileAPI} from "../../../api/api";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{ location, navigate, params }}/>
        );
    }
    return ComponentWithRouterProp;
}

class UserProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.router.params.userId
        profileAPI.getProfile(userId)
            .then(data => {
                this.props.setUserProfile(data)
            })
    }

    render() {
        return (
            (!this.props.userProfile
                ? <Preloader/>
                : <UserProfile userProfile={this.props.userProfile}/>)
        );
    }
}

const mapStateToProps = (state) => ({
    userProfile: state.usersPage.userProfile
})

const UserProfileContainerWithRouter = withRouter(UserProfileContainer)

export default connect(mapStateToProps,
    {setUserProfile: setUserProfileAC})
(UserProfileContainerWithRouter);