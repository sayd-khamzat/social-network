import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/userPhoto.jpg"

const Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers([
            {id: 1, fullName: 'Tadaev', status: 'i am boss', followed: true, location: {city: 'Grozny', country: 'CHR'}},
            {id: 2, fullName: 'Sayd', status: 'i am boss', followed: true, location: {city: 'Grozny', country: 'CHR'}},
            {id: 3, fullName: 'Khamzat', status: 'i am boss', followed: false, location: {city: 'Grozny', country: 'CHR'}}
        ])
    }

    return (
        <div>
            {props.users.map(user => (
                <div className={styles.usersBlock} key={user.id}>
                    <div>
                        <img src={userPhoto} className={styles.userPhoto}/>
                    </div>
                    <div>
                        {user.fullName}
                        <br/>
                        {user.status}
                    </div>
                    <div>
                        {!user.followed
                            ? <button onClick={() => {props.follow(user.id)}}>Follow</button>
                            : <button onClick={() => {props.unFollow(user.id)}}>UnFollow</button>}
                        <div>
                            {user.location.country}
                            <br/>
                            {user.location.city}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Users;