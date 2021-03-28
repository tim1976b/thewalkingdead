import { combineReducers } from "redux";
import { hospitalsReducer, HospitalState, selectHospitalReducer, SelectHospitalState } from "./hospitals";
import { illnessesReducer, IllnessesState, setIlnessReducer, SetIllnessState } from "./illnesses"
import { painLevelReducer, PainLevelState } from "./pain-level";
import { formSubmittedReducer, FormSubmittedState } from "./form"
import { pageReducer, PageState } from "../components/reducers";

export interface ReducerState {
    hospitalsData: HospitalState,
    ilnnessesData: IllnessesState,
    painLevelData: PainLevelState,
    selectedIlnessData: SetIllnessState,
    selectedHospitalData: SelectHospitalState,
    FormSubmittedData: FormSubmittedState
    pageData: PageState
}

export const rootReducer = combineReducers({
    hospitalsData: hospitalsReducer,
    ilnnessesData: illnessesReducer,
    painLevelData: painLevelReducer,
    selectedIlnessData: setIlnessReducer,
    selectedHospitalData: selectHospitalReducer,
    FormSubmittedData: formSubmittedReducer,
    pageData: pageReducer,
});
