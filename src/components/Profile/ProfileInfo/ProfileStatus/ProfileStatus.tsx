import React, {ChangeEvent, useEffect, useState} from "react"

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deActivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return (
        <div>
            Status:
            {!editMode &&
                <span onDoubleClick={activateEditMode}> {props.status || "No status"}</span>
            }
            {editMode &&
                <input type="text" value={status} onChange={onStatusChange}
                       onBlur={deActivateEditMode} autoFocus={true}/>
            }
        </div>
    )
}

export default ProfileStatus