import React from "react";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../store-context";

function DialogsContainer(props) {
    return (
        <StoreContext.Consumer>
            {(store) => {

                const sendMessage = () => {
                    store.dispatch(sendMessageAC());
                }

                const onMessageChange = (e) => {
                    const text = e.target.value;
                    store.dispatch(updateNewMessageTextAC(text));
                }

                return (
                    <Dialogs dialogsPage={store.getState().dialogsPage}
                             sendMessage={sendMessage}
                             onMessageChange={onMessageChange}/>
                )
            }
        }
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;