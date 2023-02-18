import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo myProfile={props.myProfile}/>
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;