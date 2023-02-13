import React from "react";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import StoreContext from "../../../store-context";

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer>
            {(store) => {

                const addPost = () => {
                    store.dispatch(addPostAC());
                }

                const onPostChange = (e) => {
                    const text = e.target.value;
                    store.dispatch(updateNewPostTextAC(text));
                }

                return (
                    <MyPosts profilePage={store.getState().profilePage}
                             addPost={addPost} onPostChange={onPostChange}/>
                )
            }
        }
        </StoreContext.Consumer>
    );
}

export default MyPostsContainer;