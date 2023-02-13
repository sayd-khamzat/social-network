import React from "react";
import Post from "./Post/Post";

const MyPosts = (props) => {

    const profilePage = props.profilePage;
    const postsElements = profilePage.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

    return (
        <div>
            MyPosts
            <div>
                <textarea onChange={props.onPostChange}
                          value={profilePage.newPostText}></textarea>
            </div>
            <div>
                <button onClick={props.addPost}>Add Post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;