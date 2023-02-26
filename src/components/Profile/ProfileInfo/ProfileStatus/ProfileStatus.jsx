import React, {useEffect, useState} from "react";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        props.getMyStatus();
    }, [props.status])

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.target.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || 'Нет статуса'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input type="text" value={status} onChange={onStatusChange}
                           onBlur={deActivateEditMode} autoFocus={true}/>
                </div>
            }
        </div>
    )
}

export default ProfileStatus;