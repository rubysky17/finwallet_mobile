import { SET_VALUE } from "./constants";
import { ActionsType, SkeletonState } from "./types";

export const reducer = (state: SkeletonState, action: ActionsType) => {
    switch (action.type) {
        case SET_VALUE:
            state.value = action.payload
            break;

        default:
            break;
    }
}