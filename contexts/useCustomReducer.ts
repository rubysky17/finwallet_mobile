import { Dispatch, useCallback, useMemo, useRef } from "react";
import { useImmerReducer } from "use-immer";

export const useCustomReducer = <
    S,
    Actions extends Record<string, Function> = any,
    A = any,
    G = {},
>(
    reducer: any,
    initialState: S,
    actions: Actions,
    globalParams?: G
): [S, Actions, Dispatch<A>] => {
    const [state, dispatch] = useImmerReducer<S, A>(reducer, initialState);
    const stateRef = useRef(state);
    stateRef.current = state;
    const memoizedGlobalParams = useMemo(() => globalParams, [globalParams]);

    const enhancedDispatch = useCallback(
        (action) => {
            let actionType = Object.prototype.toString.call(action);
            if (actionType === "[object Object]") {
                return dispatch(action);
            } else if (
                actionType === "[object Function]" ||
                actionType === "[object AsyncFunction]"
            ) {
                return action(
                    enhancedDispatch,
                    () => stateRef.current,
                    memoizedGlobalParams
                );
            }
            throw Error("action invalid!");
        },
        [dispatch, memoizedGlobalParams]
    );

    const boundActions = useMemo(() => {
        return Object.entries(actions).reduce((acc, [name, fn]) => {
            (acc as Record<string, Function>)[name] = (...args: any[]) =>
                enhancedDispatch(fn(...args));
            return acc;
        }, {} as Actions);
    }, [enhancedDispatch, actions]);

    return [state, boundActions, dispatch];
};
