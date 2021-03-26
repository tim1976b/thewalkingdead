import { combineReducers } from "redux";
import { hospitalsReducer, HospitalState } from "./hospitals";
import { illnessesReducer, IllnessesState } from "./illnesses"

export interface ReducerState {
    hospitalsData: HospitalState,
    ilnnessesData: IllnessesState,
}

export const rootReducer = combineReducers({
    hospitalsData: hospitalsReducer,
    ilnnessesData: illnessesReducer
});
