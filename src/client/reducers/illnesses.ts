import { handleActions } from "redux-actions";
import { FETCH_ILLNESSES, ILLNESSES_FETCHED, SET_ILLNESS } from "../actions/illnesses"
// XX fix types please....
export type IllnessesState = { hasNext: boolean, illnesses: any, page: number, loading: boolean };
export const illnessesReducer = handleActions<IllnessesState>({

    [FETCH_ILLNESSES]: (state, action) => ({ ...state }),
    [ILLNESSES_FETCHED]: (state, action) => (
        {
            ...action.payload,
            loading: false,
            illnesses: state.illnesses.concat(action.payload.illnesses)
        }
    )

}, { hasNext: true, illnesses: [], page: 0, loading: false });

export type SetIllnessState = number;
export const setIlnessReducer = handleActions<SetIllnessState>({

    [SET_ILLNESS]: (state, action) => (action.payload)

}, -1);

