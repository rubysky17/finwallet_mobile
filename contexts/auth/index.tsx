import { createContext, ReactNode, useContext, useMemo } from "react"
import { ActionsType, IContextValues, AuthState } from "./types";
import { useCustomReducer } from "../useCustomReducer";
import { reducer } from "./reducer";
import { actions as AuthActions } from "./actions";

export const AuthContext = createContext<
    IContextValues<typeof AuthActions>
>({} as IContextValues);

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props;

    const initialState = useMemo(() => ({
        isLoading: true,
        isOnboarding: null,
        isGuest: null
    }), []);

    const [state, actions] = useCustomReducer<
        AuthState,
        typeof AuthActions,
        ActionsType
    >(reducer, initialState, AuthActions);

    return <AuthContext.Provider value={{
        state,
        actions,
    }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}