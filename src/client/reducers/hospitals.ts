import { handleActions } from "redux-actions";
import { FETCH_HOSPITALS, HOSPITALS_FETCHED, SELECT_HOSPITAL } from "../actions/hospitals";

export type HospitalState = { hasNext: boolean, hospitals: any[], page: any, loading: boolean };
export const hospitalsReducer = handleActions<HospitalState>({

    [FETCH_HOSPITALS]: (state, action) => ({ ...state }),
    [HOSPITALS_FETCHED]: (state, action) => {

        if (action.payload.page.number === 0) { // XXX reset hospital data if page 0 is requested again 
            return {
                ...action.payload,
                hospitals: !action.payload.hasNext ? action.payload.hospitals : action.payload.hospitals.sort((a, b) => a.waitingTime - b.waitingTime)
            }
        } else {
            return {
                ...action.payload,
                loading: false,
                hospitals: action.payload.hasNext ? state.hospitals.concat(action.payload.hospitals) : state.hospitals.concat(action.payload.hospitals).sort((a, b) => a.waitingTime - b.waitingTime),
            }
        }
    }
}, { hasNext: true, hospitals: [], page: 0, loading: false });

export type SelectHospitalState = number;
export const selectHospitalReducer = handleActions<SelectHospitalState>({

    [SELECT_HOSPITAL]: (state, action) => (action.payload)

}, -1);
