import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {FormControl} from "../../common/FormControls/FormControls"
import {required} from "../../../utils/validators/validators"
import styles from "../Login.module.css"

type OwnPropsType = {
    captchaUrl: string | null
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Input = FormControl("input")

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, OwnPropsType> & OwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
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
    )
}

export default reduxForm<LoginFormValuesType, OwnPropsType>({form: 'login'})(LoginForm)