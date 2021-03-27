import { createAction } from "redux-actions";

enum HospitalActionTypes {
    FetchHospitals = "FETCH_HOSPITALS",
    HospitalFetched = "HOSPITALS_FETCHED",
    SelectHospital = "SELECT_HOSPITAL",
}

export const FETCH_HOSPITALS = HospitalActionTypes.FetchHospitals;
export const HOSPITALS_FETCHED = HospitalActionTypes.HospitalFetched;
export const SELECT_HOSPITAL = HospitalActionTypes.SelectHospital;

export const fetchHospitals = createAction(FETCH_HOSPITALS);
export const hospitalsFetched = createAction(HOSPITALS_FETCHED);
export const selectHospital = createAction(SELECT_HOSPITAL);
