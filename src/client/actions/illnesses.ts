import { createAction } from "redux-actions";

enum IllnessesActionTypes {
    FetchIlnesses = "FETCH_ILLNESSES",
    IllnessesFetched = "ILLNESSES_FETCHED",
    setIllness = "SET_ILLNESS",
}

export const FETCH_ILLNESSES = IllnessesActionTypes.FetchIlnesses;
export const ILLNESSES_FETCHED = IllnessesActionTypes.IllnessesFetched;
export const SET_ILLNESS = IllnessesActionTypes.setIllness;

export const fetchIllnesses = createAction(FETCH_ILLNESSES);
export const illnessesFetched = createAction(ILLNESSES_FETCHED);
export const setIllness = createAction(SET_ILLNESS);
