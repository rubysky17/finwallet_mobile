import { SET_ONBOARDING, SET_GUEST, SET_LOADING } from "./types"
import * as Constants from "./constants";

const setOnboarding = (payload: boolean): SET_ONBOARDING => ({
    type: Constants.SET_ONBOARDING,
    payload,
});

const setGuest = (payload: boolean): SET_GUEST => ({
    type: Constants.SET_GUEST,
    payload,
})
const setLoading = (payload: boolean): SET_LOADING => ({
    type: Constants.SET_LOADING,
    payload,
})

export const actions = {
    setOnboarding,
    setGuest,
    setLoading
}