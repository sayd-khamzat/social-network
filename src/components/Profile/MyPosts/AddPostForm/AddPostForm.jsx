import React from "react";
import {Field, reduxForm} from "redux-form";

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="postText" component="textarea"
                       type="text" placeholder="New post"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "addPost"})(AddPostForm);