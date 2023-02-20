import React from "react";
import {connect} from "react-redux";
import {followTC, getUsersTC, pageChangedTC, unFollowTC} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersAPIComponent extends React.Component { //контейнерный компонент для Users

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage)
    }

    onPageChanged = (pageNumber) => {
        this.props.pageChanged(this.props.pageSize, pageNumber)
    }

    render() {
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users users={this.props.users}
                       currentPage={this.props.currentPage}
                       totalItemsCount={this.props.totalItemsCount}
                       pageSize={this.props.pageSize}
                       follow={this.props.follow}
                       unFollow={this.props.unFollow}
                       onPageChanged={this.onPageChanged}
                       followingInProgress={this.props.followingInProgress}/>
            </>
        );
    }
}

const mapStateToProps = (state) => { //контейнерный компонент для UsersAPIComponent
    return {
        users: state.usersPage.users,
        totalItemsCount: state.usersPage.totalItemsCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps,
    {getUsers: getUsersTC, pageChanged: pageChangedTC,
        follow: followTC,unFollow: unFollowTC})
(UsersAPIComponent);