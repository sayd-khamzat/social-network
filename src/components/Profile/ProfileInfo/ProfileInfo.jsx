import React from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/userPhoto.jpg";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

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
            <div>
                <ProfileStatus status={props.myStatus}
                               getMyStatus={props.getMyStatus}
                               updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;