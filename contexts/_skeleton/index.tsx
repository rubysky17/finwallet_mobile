import { createContext, ReactNode, useContext, useMemo } from "react"
import { useCustomReducer } from "../useCustomReducer";
import { ActionsType, IContextValues, SkeletonState } from "./types";
import { actions as SkeletonActions } from "./actions";
import { reducer } from "./reducer";

export const SkeletonContext = createContext<
    IContextValues<typeof SkeletonActions>
>({} as IContextValues);

interface SkeletonProviderProps {
    children?: ReactNode;
}

export const SkeletonProvider = (props: SkeletonProviderProps) => {
    const { children } = props;

    const initialState = useMemo(() => ({
        value: 1
    }), []);

    const [state, actions] = useCustomReducer<
        SkeletonState,
        typeof SkeletonActions,
        ActionsType
    >(reducer, initialState, SkeletonActions);

    return <SkeletonContext.Provider value={{
        state,
        actions,
    }}>
        {children}
    </SkeletonContext.Provider>
}

export const useSkeleton = () => {
    const ctx = useContext(SkeletonContext);
    if (!ctx) throw new Error("useSkeleton must be used within SkeletonProvider");
    return ctx;
}