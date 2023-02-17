import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/userPhoto.jpg"
import axios from "axios";

const Users = (props) => {

    if (props.users.length === 0) {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
            .then(response => {
                props.setUsers(response.data.items)
            })
    }

    return (
        <div>
            {props.users.map(user => (
                <div className={styles.usersBlock} key={user.id}>
                    <div>
                        <img src={user.photos.small
                            ? user.photos.small
                            : userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {user.name}
                        <br/>
                        {user.status}
                    </div>
                    <div>
                        {!user.followed
                            ? <button onClick={() => {props.follow(user.id)}}>Follow</button>
                            : <button onClick={() => {props.unFollow(user.id)}}>UnFollow</button>}
                        <div>
                            user.location.country
                            <br/>
                            user.location.city
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Users;