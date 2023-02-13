import React from "react";
import StoreContext from "./store-context";

const storeContext = React.createContext(null);

export const Provider = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default storeContext;