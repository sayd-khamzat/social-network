import React from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/userPhoto.jpg";

const ProfileInfo = (props) => {

    const myProfile = props.myProfile

    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={myProfile.photos.small
                    ? myProfile.photos.small
                    : userPhoto}/>
            </div>
            <div>
                {myProfile.fullName}
            </div>
        </div>
    )
}

export default ProfileInfo;