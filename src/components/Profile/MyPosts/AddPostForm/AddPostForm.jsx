import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl} from "../../../common/FormControls/FormControls";

const Textarea = FormControl("textarea");
const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="postText" component={Textarea}
                       type="text" placeholder="New post"
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "addPost"})(AddPostForm);