import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            MyPosts
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Add Post</button>
            </div>
            <div>
                <Post message='Post 1'/>
                <Post message='Post 2'/>
            </div>
        </div>
    );
}

export default MyPosts;