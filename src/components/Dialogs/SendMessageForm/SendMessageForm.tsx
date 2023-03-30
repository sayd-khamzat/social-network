import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../utils/validators/validators"
import {FormControl} from "../../common/FormControls/FormControls"

type PropsType = {}

export type SendMessageFormValuesType = {
    newMessage: string
}

const Textarea = FormControl("textarea")
const maxLength30 = maxLengthCreator(30)

const SendMessageForm: React.FC<InjectedFormProps<SendMessageFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
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

export default reduxForm<SendMessageFormValuesType, PropsType>({form: 'sendMessage'})(SendMessageForm)