import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";

const MyPosts = (props) => {

    const profilePage = props.profilePage;

    const postsElements = profilePage.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

    const addPost = () => {
        props.dispatch(addPostAC());
    }

    const onPostChange = (e) => {
        const text = e.target.value;
        props.dispatch(updateNewPostTextAC(text));
    }

    return (
        <div>
            MyPosts
            <div>
                <textarea onChange={onPostChange}
                          value={profilePage.newPostText}></textarea>
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;