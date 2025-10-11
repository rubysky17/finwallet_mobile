import { SET_ONBOARDING, SET_GUEST, SET_LOADING } from "./constants";

export interface IContextValues<T = any> {
    state: AuthState;
    actions: T;
}

export interface AuthState {
    isLoading: boolean;
    isOnboarding: boolean;
    isGuest: boolean;
}

export type SET_ONBOARDING = {
    type: typeof SET_ONBOARDING;
    payload: boolean;
};

export type SET_GUEST = {
    type: typeof SET_GUEST;
    payload: boolean;
};

export type SET_LOADING = {
    type: typeof SET_LOADING;
    payload: boolean;
};

export type ActionsType =
    SET_ONBOARDING |
    SET_GUEST |
    SET_LOADING; 