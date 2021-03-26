import { handleActions } from "redux-actions";
import { FETCH_HOSPITALS, HOSPITALS_FETCHED } from "../actions/hospitals";

export type HospitalState = { hospitals: {} | undefined, loading: boolean };
export const hospitalsReducer = handleActions<HospitalState>({
    // XXX use ES6 spread .... and append to hospital list instead of override 
    [FETCH_HOSPITALS]: (state, action) => ({
        hospitals: state.hospitals,
        loading: true
    }),
    [HOSPITALS_FETCHED]: (state, action) => ({
        hospitals: action.payload,
        loading: false
    })
}, { hospitals: undefined, loading: false });

