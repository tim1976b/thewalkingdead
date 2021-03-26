import { handleActions } from "redux-actions";
import { SET_PAIN_LEVEL } from "../actions/pain-level";

export type PainLevelState = number;
export const painLevelReducer = handleActions<PainLevelState>({

    [SET_PAIN_LEVEL]: (state, action) => (action.payload)

}, -1);

