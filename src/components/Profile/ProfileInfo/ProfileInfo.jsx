import React from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/userPhoto.jpg";
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileInfo = (props) => {

    const myProfile = props.myProfile;

    const mainPhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={myProfile.photos.small
                    ? myProfile.photos.small
                    : userPhoto}/>
            </div>
            <input type="file" onChange={mainPhotoSelected}/>
            <div>
                {myProfile.fullName}
            </div>
            <div>
                <ProfileStatus status={props.myStatus}
                               updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo;