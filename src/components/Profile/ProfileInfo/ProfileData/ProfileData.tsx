import React from "react"
import styles from "../ProfileInfo.module.css"
import {ContactType, ProfileType} from "../../../../types/types"

type PropsType = {
    myProfile: ProfileType
    goToEditMode: (value: boolean) => void
}

const ProfileData: React.FC<PropsType> = ({myProfile, goToEditMode}) => {
    return (
        <div>
            <div>
                <button onClick={() => goToEditMode(true)}>Edit</button>
            </div>
            <div>
                <span>About me:</span> {myProfile.aboutMe}
            </div>
            <div>
                <span>Looking for a job:</span> {myProfile.lookingForAJob ? "Yes" : "No"}
            </div>
            {myProfile.lookingForAJob &&
                <div>
                    <span>Looking for a job description:</span> {myProfile.lookingForAJobDescription}
                </div>
            }
            <div>
                <span>Contacts:</span> {Object.keys(myProfile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={myProfile.contacts[key as keyof ContactType]}/>})}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={styles.contact}>
            <span>{contactTitle}: </span>
            {contactValue}
        </div>
    )
}

export default ProfileData