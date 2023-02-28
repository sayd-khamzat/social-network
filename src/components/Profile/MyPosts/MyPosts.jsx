import React from "react";
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";

const MyPosts = (props) => {

    const profilePage = props.profilePage;
    const postsElements = profilePage.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

    const addPost = (formData) => {
        props.addPostAC(formData.postText);
    }

    return (
        <div>
            MyPosts
            <div>
                <AddPostForm onSubmit={addPost}/>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;