import React, {useEffect, useState} from "react";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.target.value);
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

export default ProfileStatus;