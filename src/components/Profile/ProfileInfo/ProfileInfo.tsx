import React, {ChangeEvent, useState} from "react"
import styles from "./ProfileInfo.module.css"
import userPhoto from "../../../assets/images/userPhoto.jpg"
import ProfileStatus from "./ProfileStatus/ProfileStatus"
import ProfileData from "./ProfileData/ProfileData"
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm"
import {ProfileType} from "../../../types/types"

type PropsType = {
    myProfile: ProfileType
    myStatus: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({myProfile, myStatus, updateStatus, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(() => {
            setEditMode(false)
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
    )
}

export default ProfileInfo