import { SET_VALUE } from "./constants";


export interface IContextValues<T = any> {
    state: SkeletonState;
    actions: T;
}

export interface SkeletonState {
    value: number | null
}

export type SET_VALUE = {
    type: typeof SET_VALUE;
    payload: number;
};

// | OTHER_ACTION_TYPE | ANOTHER_ACTION_TYPE
export type ActionsType = SET_VALUE; 