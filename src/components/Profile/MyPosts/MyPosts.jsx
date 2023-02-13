import React from "react";
import Post from "./Post/Post";

const MyPosts = (props) => {

    const profilePage = props.profilePage;
    const postsElements = profilePage.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

    const addPost = () => {
        props.addPostAC();
    }

    const onPostChange = (e) => {
        const text = e.target.value;
        props.updateNewPostTextAC(text);
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