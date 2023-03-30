import React from "react"
import userPhoto from "../../../assets/images/userPhoto.jpg"
import styles from "./UserProfile.module.css"
import {ProfileType} from "../../../types/types"

type PropsType = {
    userProfile: ProfileType
    userStatus: string
}

const UserProfile: React.FC<PropsType> = ({userProfile, userStatus}) => {
    return (
        <div className={styles.profileBlock}>
            <div>
                <img src={userProfile.photos.small
                    ? userProfile.photos.small
                    : userPhoto}/>
            </div>
            <div>
                {userProfile.fullName}
                <br/>
                {userStatus}
            </div>
        </div>
    )
}

export default UserProfile