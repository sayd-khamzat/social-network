import React from "react"
import Post from "./Post/Post"
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm/AddPostForm"
import {InitialStateType} from "../../../redux/profile-reducer"

export type MapStatePropsType = {
    profilePage: InitialStateType
}
export type MapDispatchPropsType = {
    addPost: (postText: string) => void
}

const MyPosts: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const profilePage = props.profilePage
    const postsElements = profilePage.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>)

    const addPost = (formData: AddPostFormValuesType) => {
        props.addPost(formData.postText)
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
    )
}

export const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized