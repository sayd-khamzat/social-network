import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormControls/FormControls";
import {required} from "../../../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="email" component={Input}
                       placeholder="Email" type="email"
                       validate={required}/>
            </div>
            <div>
                <Field name="password" component={Input}
                       placeholder="Password" type="password"
                       validate={required}/>
            </div>
            <div>
                <Field name="rememberMe" component="input"
                       placeholder="Password" type="checkbox"/>
            </div>
            <div>
                <button>Log in</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "login"})(LoginForm);