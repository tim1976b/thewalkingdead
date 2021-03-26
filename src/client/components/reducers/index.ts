import { handleActions } from "redux-actions";
import { MOVE_NEXT, MOVE_BACK, RESET } from "../actions";

export type PageState = number;

export const pageReducer = handleActions<PageState>({
    [MOVE_NEXT]: (state, action) => (++state),
    [MOVE_BACK]: (state, action) => (--state),
    [RESET]: (state, action) => (0),
}, 0);

