import React, {createRef} from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {

    const postsElements = props.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>)

    const newPostElement = React.createRef()

    const addPost = () => {
        const text = newPostElement.current.value
        props.addPost(text)
        newPostElement.current.value = ''
    }

    return (
        <div>
            MyPosts
            <div>
                <textarea ref={newPostElement}></textarea>
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