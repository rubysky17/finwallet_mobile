import { SET_ONBOARDING, SET_GUEST, SET_LOADING } from "./constants";
import { ActionsType, AuthState } from "./types";

export const reducer = (state: AuthState, action: ActionsType) => {
    switch (action.type) {
        case SET_ONBOARDING:
            state.isOnboarding = action.payload
            break;

        case SET_GUEST:
            state.isGuest = action.payload
            break;

        case SET_LOADING:
            state.isLoading = action.payload
            break;

        default:
            break;
    }
}