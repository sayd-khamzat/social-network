import React from "react";
import styles from "./Users.module.css"
import userPhoto from "../../assets/images/userPhoto.jpg"
import axios from "axios";

class UsersClass extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
                {this.props.users.map(user => (
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
                                ? <button onClick={() => {this.props.follow(user.id)}}>Follow</button>
                                : <button onClick={() => {this.props.unFollow(user.id)}}>UnFollow</button>}
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
}

export default UsersClass;