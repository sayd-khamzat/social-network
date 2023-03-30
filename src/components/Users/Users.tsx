import React from "react"
import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import {UserType} from "../../types/types"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    followingInProgress: Array<number>
    users: Array<UserType>
    onPageChanged: (page: number) => void
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

const Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            {props.users.map(user => (
                <User key={user.id} user={user} followingInProgress={props.followingInProgress}
                      follow={props.follow} unFollow={props.unFollow}/>
            ))}
            <Paginator totalItemsCount={props.totalItemsCount} pageSize={props.pageSize}
                       currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
        </div>
    )
}

export default Users