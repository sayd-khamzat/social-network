import React from "react";
import Post from "./Post/Post";
import AddPostForm from "./AddPostForm/AddPostForm";

const MyPosts = React.memo((props) => {//memo добавил, но разницы нет.
    // Мемо должен сравнивать пред. и след. пропсы, для того, чтобы небыло лишних перерисовок.
    // Перерисовок и без мемо нет.

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
})

export default MyPosts;