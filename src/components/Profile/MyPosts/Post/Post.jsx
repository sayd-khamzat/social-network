import React from "react";
import styles from "./Post.module.css";

const Post = (props) => {
    return (
        <div>
            <div className={styles.item}>
                <img src='https://abrakadabra.fun/uploads/posts/2021-12/thumbs/1640528649_39-abrakadabra-fun-p-serii-chelovek-na-avu-44.jpg'/>
                {props.message}
            </div>
            <div className={styles.item}>
                Likes: {props.likesCount}
            </div>
        </div>
    );
}

export default Post;