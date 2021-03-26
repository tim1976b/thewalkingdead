import { handleActions } from "redux-actions";
import { FETCH_ILLNESSES, ILLNESSES_FETCHED } from "../actions/illnesses"

export type IllnessesState = { illnesses: {} | undefined, loading: boolean };
export const illnessesReducer = handleActions<IllnessesState>({
    // XXX use ES6 spread .... and append to illnesses list instead of override 
    [FETCH_ILLNESSES]: (state, action) => ({
        illnesses: state.illnesses,
        loading: true

    }),
    [ILLNESSES_FETCHED]: (state, action) => ({
        illnesses: action.payload,
        loading: false
    })
}, { illnesses: undefined, loading: false });