import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/userPhoto.jpg"
import {NavLink} from "react-router-dom";

const User = ({user, followingInProgress, follow, unFollow}) => {
    return (
        <div className={styles.usersBlock}>
            <div>
                <NavLink to={'/users/' + user.id}>
                    <img src={user.photos.small
                        ? user.photos.small
                        : userPhoto} className={styles.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {user.name}
                <br/>
                {user.status}
            </div>
            <div>
                {!user.followed
                    ? <button disabled={followingInProgress.some(u => u === user.id)}
                              onClick={() => {follow(user.id)}}>Follow</button>

                    : <button disabled={followingInProgress.some(u => u === user.id)}
                              onClick={() => {unFollow(user.id)}}>UnFollow</button>}
                <div>
                    user.location.country
                    <br/>
                    user.location.city
                </div>
            </div>
        </div>
    );
}

export default User;