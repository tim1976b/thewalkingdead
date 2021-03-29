import { handleActions } from "redux-actions";
import { FORM_SUBMITTED } from "../actions/form";

export type FormSubmittedState = boolean;
export const formSubmittedReducer = handleActions<FormSubmittedState>({

    [FORM_SUBMITTED]: (state, action) => (true)

}, false);

