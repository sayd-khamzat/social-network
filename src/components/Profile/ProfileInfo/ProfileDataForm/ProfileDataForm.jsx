import React from "react";
import styles from "../ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl} from "../../../common/FormControls/FormControls";

const Input = FormControl("input");
const Textarea = FormControl("textarea");
const maxLength15 = maxLengthCreator(15);
const maxLength30 = maxLengthCreator(30);

const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>Save</button>
            {props.error &&
                <span className={styles.formSummaryError}>{props.error}</span>}
            <div>
                <span>Full name:</span>
                <Field name="fullName" component={Input}
                       validate={[required, maxLength15]}/>
            </div>
            <div>
                <span>About me:</span>
                <Field name="aboutMe" component={Textarea}
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <span>Looking for a job:</span>
                <Field name="lookingForAJob" component={Input} type="checkbox"/>
            </div>
            <div>
                <span>Looking for a job description:</span>
                <Field name="lookingForAJobDescription" component={Textarea}
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <span>Contacts:</span> {Object.keys(props.myProfile.contacts).map(key => {
                return <div key={key} className={styles.contact}>
                    <span>{key}:</span>
                    <Field name={"contacts." + key} component={Input}/>
                </div>
                })}
            </div>
        </form>
    );
}

export default reduxForm({form: "editProfile"})(ProfileDataForm);