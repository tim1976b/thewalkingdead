import { ReducerState } from "../reducers";

export const getIllnesses = (state: ReducerState) => state.ilnnessesData;
export const getSelectedIllnesse = (state: ReducerState) => state.selectedIlnessData;