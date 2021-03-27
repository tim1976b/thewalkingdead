import { createAction } from "redux-actions";

enum FormActionTypes {
    SubmitForm = "SUBMIT_FORM",
    FormSubmitted = "FORM_SUBMITTED",
    FormSubmitionFailed = "FORM_SUBMITION_FAILED", // XXX later
}

export const SUBMIT_FORM = FormActionTypes.SubmitForm;
export const FORM_SUBMITTED = FormActionTypes.FormSubmitted;
export const FORM_SUBMITION_FAILED = FormActionTypes.FormSubmitionFailed;


export const SubmitForm = createAction(SUBMIT_FORM);
export const FormSubmitted = createAction(FORM_SUBMITTED);
export const FormSubmitionFailed = createAction(FORM_SUBMITION_FAILED);
