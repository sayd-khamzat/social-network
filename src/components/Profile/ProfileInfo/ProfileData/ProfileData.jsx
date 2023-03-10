import React from "react";
import styles from "../ProfileInfo.module.css";

const ProfileData = ({myProfile, goToEditMode}) => {
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
                return <Contact key={key} contactTitle={key} contactValue={myProfile.contacts[key]}/>})}
            </div>
        </div>
    );
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={styles.contact}>
            <span>{contactTitle}: </span>
            {contactValue}
        </div>
    );
}

export default ProfileData;