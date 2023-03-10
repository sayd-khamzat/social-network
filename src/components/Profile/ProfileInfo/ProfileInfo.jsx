import React, {useState} from "react";
import styles from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/userPhoto.jpg";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

const ProfileInfo = ({myProfile, myStatus, updateStatus, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false);

    const mainPhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }

    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={myProfile.photos.small
                    ? myProfile.photos.small
                    : userPhoto}/>
                <input type="file" onChange={mainPhotoSelected}/>
            </div>
            <div>
                <p className={styles.userName}>{myProfile.fullName}</p>
                <div>
                    {editMode
                        ? <ProfileDataForm initialValues={myProfile} myProfile={myProfile} onSubmit={onSubmit}/>
                        : <ProfileData myProfile={myProfile} goToEditMode={setEditMode}/>
                    }
                </div>
            </div>
            <ProfileStatus status={myStatus} updateStatus={updateStatus}/>
        </div>
    );
}

export default ProfileInfo;