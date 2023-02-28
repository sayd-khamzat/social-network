import React from "react";
import {Field, reduxForm} from "redux-form";

const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newMessage" component="textarea"
                       type="text" placeholder="Enter message"/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "sendMessage"})(SendMessageForm);