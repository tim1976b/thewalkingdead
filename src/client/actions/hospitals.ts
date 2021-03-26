import { createAction } from "redux-actions";

enum HospitalActionTypes {
    FetchHospitals = "FETCH_HOSPITALS",
    HospitalFetched = "HOSPITALS_FETCHED"
}
export type FetchHospitalsAction = {
    type: HospitalActionTypes.FetchHospitals;
}

export const FETCH_HOSPITALS = HospitalActionTypes.FetchHospitals;
export const HOSPITALS_FETCHED = HospitalActionTypes.HospitalFetched;

export const fetchHospitals = createAction(FETCH_HOSPITALS);
export const hospitalsFetched = createAction(HOSPITALS_FETCHED);
