import { combineReducers } from "redux";
import { hospitalsReducer, HospitalState } from "./hospitals";
import { illnessesReducer, IllnessesState } from "./illnesses"
import { painLevelReducer, PainLevelState } from "./pain-level";
import { pageReducer, PageState } from "../components/reducers";

export interface ReducerState {
    hospitalsData: HospitalState,
    ilnnessesData: IllnessesState,
    painLevelData: PainLevelState,
    pageData: PageState
}

export const rootReducer = combineReducers({
    hospitalsData: hospitalsReducer,
    ilnnessesData: illnessesReducer,
    painLevelData: painLevelReducer,
    pageData: pageReducer,
});
