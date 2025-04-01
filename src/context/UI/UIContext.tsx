import { createContext, useContext, useReducer } from "react";
import { UIReducer, initialState } from "./UIReducer"
import type { UIDataContext } from "./UIContextTypes";

export const UIContext = createContext({} as UIDataContext)

export const UIProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(UIReducer, initialState)

    return (
        <UIContext.Provider value={{ state, dispatch }}>
            {children}
        </UIContext.Provider>
    )
}

export const useUIContext = () => useContext(UIContext)