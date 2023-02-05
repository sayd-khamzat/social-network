import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const postsData = [
    {id:1, message: "Post 1", likesCount: 10},
    {id:2, message: "Post 2", likesCount: 15},
    {id:3, message: "Post 3", likesCount: 30}
]

const postsElements = postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>)

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
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;