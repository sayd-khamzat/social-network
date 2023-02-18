import React from "react";
import userPhoto from "../../../assets/images/userPhoto.jpg"
import styles from "./UserProfile.module.css"

const UserProfile = (props) => {

    const userProfile = props.userProfile

    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={userProfile.photos.small
                    ? userProfile.photos.small
                    : userPhoto}/>
            </div>
            <div>
                {userProfile.fullName}
            </div>
        </div>
    )
}

export default UserProfile;