import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {

    const addPost = () => {
        props.dispatch(addPostAC());
    }

    const onPostChange = (e) => {
        const text = e.target.value;
        props.dispatch(updateNewPostTextAC(text));
    }

    return (
        <div>
            <MyPosts profilePage={props.profilePage}
                     addPost={addPost} onPostChange={onPostChange}/>
        </div>
    );
}

export default MyPostsContainer;