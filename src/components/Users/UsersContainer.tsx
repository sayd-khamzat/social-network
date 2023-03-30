import React, {useEffect} from "react"
import {connect} from "react-redux"
import {followTC, getUsersTC, pageChangedTC, unFollowTC} from "../../redux/users-reducer"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalItemsCount, getUsers}
    from "../../redux/selectors/users-selectors"
import {UserType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type OwnPropsType = {
    pageTitle: string
}
type MapStatePropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    users: Array<UserType>
}
type MapDispatchPropsType = {
    pageChanged: (pageSize: number, pageNumber: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    getUsers: (pageSize: number, currentPage: number) => void
}

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType

const UsersContainer: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.getUsers(props.pageSize, props.currentPage)
        }, [])

    const onPageChanged = (pageNumber: number) => {
        props.pageChanged(props.pageSize, pageNumber)
    }

    return (
        <>
            <h2>{props.pageTitle}</h2>
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
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        totalItemsCount: getTotalItemsCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUsers: getUsersTC, pageChanged: pageChangedTC,
        follow: followTC, unFollow: unFollowTC
    })
(UsersContainer)