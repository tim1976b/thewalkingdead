import { handleActions } from "redux-actions";
import { FETCH_ILLNESSES, ILLNESSES_FETCHED, SET_ILLNESS } from "../actions/illnesses"
// XX fix types please....
export type IllnessesState = { hasNext: boolean, illnesses: any, page: number, loading: boolean };
export const illnessesReducer = handleActions<IllnessesState>({

    [FETCH_ILLNESSES]: (state, action) => ({
        illnesses: state.illnesses,
        loading: true,
        hasNext: state.hasNext,
        page: state.page,

    }),
    [ILLNESSES_FETCHED]: (state, action) => ({
        hasNext: action.payload.hasNext,
        page: action.payload.page,
        illnesses: state.illnesses.concat(action.payload.illnesses),
        loading: false
    })

}, { hasNext: true, illnesses: [], page: 0, loading: false });



export type SetIllnessState = number;
export const setIlnessReducer = handleActions<SetIllnessState>({

    [SET_ILLNESS]: (state, action) => (action.payload)

}, -1);

