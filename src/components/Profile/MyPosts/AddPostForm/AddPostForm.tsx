import React from "react"
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../../../utils/validators/validators"
import {FormControl} from "../../../common/FormControls/FormControls"

type PropsType ={}

export type AddPostFormValuesType = {
    postText: string
}

const Textarea = FormControl("textarea")
const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="postText" component={Textarea}
                       type="text" placeholder="New post"
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

export default reduxForm<AddPostFormValuesType, PropsType>({form: 'addPost'})(AddPostForm)