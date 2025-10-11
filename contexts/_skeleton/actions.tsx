import { SET_VALUE, SkeletonState } from "./types"
import * as Constants from "./constants";

const setValue = (payload: number): SET_VALUE => ({
    type: Constants.SET_VALUE,
    payload,
})

export const actions = {
    setValue,
}