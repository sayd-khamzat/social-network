import React from "react";
import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC,
    setUsersAC,
    setUsersTotalCountAC,
    toggleIsFetchingAC,
    toggleIsFollowingProgressAC,
    unFollowAC
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

class UsersAPIComponent extends React.Component { //контейнерный компонент для Users

    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setUsersTotalCount(data.totalCount);
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(this.props.pageSize, pageNumber)
            .then(data => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })
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
                       toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
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
    {
        follow: followAC, unFollow: unFollowAC,
        setUsers: setUsersAC, setUsersTotalCount: setUsersTotalCountAC,
        setCurrentPage: setCurrentPageAC, toggleIsFetching: toggleIsFetchingAC,
        toggleIsFollowingProgress: toggleIsFollowingProgressAC
    })
(UsersAPIComponent);