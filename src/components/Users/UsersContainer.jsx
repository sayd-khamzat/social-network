import React, {useEffect} from "react";
import {connect} from "react-redux";
import {followTC, getUsersTC, pageChangedTC, unFollowTC} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalItemsCount,
    getUsers
} from "../../redux/selectors/users-selectors";

const UsersContainer = (props) => {

    useEffect(() => {
        props.getUsers(props.pageSize, props.currentPage);
        }, [])

    const onPageChanged = (pageNumber) => {
        props.pageChanged(props.pageSize, pageNumber);
    }

    return (
        <>
            {props.isFetching && <Preloader/>}
            <Users users={props.users}
                   currentPage={props.currentPage}
                   totalItemsCount={props.totalItemsCount}
                   pageSize={props.pageSize}
                   follow={props.follow}
                   unFollow={props.unFollow}
                   onPageChanged={onPageChanged}
                   followingInProgress={props.followingInProgress}/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalItemsCount: getTotalItemsCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect(mapStateToProps,
    {
        getUsers: getUsersTC, pageChanged: pageChangedTC,
        follow: followTC, unFollow: unFollowTC
    })
(UsersContainer);