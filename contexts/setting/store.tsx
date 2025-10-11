import { createContext } from "react"
import { useCustomReducer } from "../useCustomReducer";

import reducer from "./reducer";
import { actions } from "./actions";

export const Context = createContext({});

const initialState = {
    isDarkMode: false
}

export const SettingProvider = ({ children }) => {
    const [state, bindingActionsCreator, dispatch] = useCustomReducer(reducer, actions, initialState);

    return <Context.Provider value={{ state, bindingActionsCreator, dispatch }}>
        {children}
    </Context.Provider>
}