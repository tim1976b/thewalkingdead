import { createAction } from "redux-actions";

enum IllnessesActionTypes {
    FetchIlnesses = "FETCH_ILLNESSES",
    IllnessesFetched = "ILLNESSES_FETCHED",
}

export const FETCH_ILLNESSES = IllnessesActionTypes.FetchIlnesses;
export const ILLNESSES_FETCHED = IllnessesActionTypes.IllnessesFetched;

// export type FetchIlnessesAction = {
//     type: IllnessesActionTypes.FetchIlnesses;
// }

export const fetchIllnesses = createAction(FETCH_ILLNESSES);
export const illnessesFetched = createAction(ILLNESSES_FETCHED);
