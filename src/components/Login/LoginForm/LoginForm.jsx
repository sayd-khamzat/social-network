import React from "react";
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../../common/FormControls/FormControls";
import {required} from "../../../utils/validators/validators";
import styles from "../Login.module.css";

const Input = FormControl("input");

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
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
                <div>Remember Me</div>
            </div>

            {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
            {captchaUrl && <Field name="captcha" component={Input}
                                  placeholder="Symbols from image"
                                  validate={required}/>}

            {error && <span className={styles.formSummaryError}>{error}</span>}

            <div>
                <button>Log in</button>
            </div>
        </form>
    );
}

export default reduxForm({form: "login"})(LoginForm);