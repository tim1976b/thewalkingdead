import { createAction } from "redux-actions";

enum PainLevelsActionTypes {
    SetPainLevel = "SET_PAIN_LEVEL",
}

export const SET_PAIN_LEVEL = PainLevelsActionTypes.SetPainLevel;

export const SetPainLevel = createAction(SET_PAIN_LEVEL);
