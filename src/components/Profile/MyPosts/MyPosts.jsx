import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

    const postsElements = props.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>)

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
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;