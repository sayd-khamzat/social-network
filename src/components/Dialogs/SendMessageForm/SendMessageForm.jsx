import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {FormControl} from "../../common/FormControls/FormControls";

const Textarea = FormControl("textarea");
const maxLength30 = maxLengthCreator(30);

const SendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newMessage" component={Textarea}
                       type="text" placeholder="Enter message"
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <button>Send Message</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "sendMessage"})(SendMessageForm);