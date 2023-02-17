import React from "react";
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, unFollowAC} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";

class UsersAPIComponent extends React.Component { //контейнерный компонент для Users

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setUsersTotalCount(response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }

    render() {
        return (
            <Users users={this.props.users}
                   currentPage={this.props.currentPage}
                   totalItemsCount={this.props.totalItemsCount}
                   pageSize={this.props.pageSize}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   onPageChanged={this.onPageChanged}
            />
        );
    }
}

const mapStateToProps = (state) => { //контейнерный компонент для UsersAPIComponent
    return {
        users: state.usersPage.users,
        totalItemsCount: state.usersPage.totalItemsCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => dispatch(followAC(userId)),
        unFollow: (userId) => dispatch(unFollowAC(userId)),
        setUsers: (users) => dispatch(setUsersAC(users)),
        setUsersTotalCount: (totalCount) => dispatch(setUsersTotalCountAC(totalCount)),
        setCurrentPage: (pageNumber) => dispatch(setCurrentPageAC(pageNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);