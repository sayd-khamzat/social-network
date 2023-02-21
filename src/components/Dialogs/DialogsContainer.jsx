import React from "react";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps,
    {sendMessageAC, updateNewMessageTextAC})
(Dialogs);