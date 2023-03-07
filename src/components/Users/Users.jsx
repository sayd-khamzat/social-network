import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {
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

export default Users;