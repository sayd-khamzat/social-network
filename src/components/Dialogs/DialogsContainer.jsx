import React from "react";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const withAuthRedirectComponent = withAuthRedirect(Dialogs);

export default connect(mapStateToProps,
    {sendMessageAC, updateNewMessageTextAC})
(withAuthRedirectComponent);