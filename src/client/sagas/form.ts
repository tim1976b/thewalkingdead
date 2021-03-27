import { takeLatest } from "redux-saga/effects";
import { SUBMIT_FORM, FormSubmitted, FormSubmitionFailed } from "../actions/form";
import { doFetch } from "./common";
import { AnyAction } from "redux";
import { formUrl } from "../../common/constants"
import { store } from "../store";
import { getPainLevel } from "../selectors/pain-level";
import { getSelectedIllnesse } from "../selectors/illnesses";
export function* submitFormWatcher() {

    yield takeLatest(SUBMIT_FORM, function* (action: AnyAction) {
        yield doFetch({
            url: formUrl,
            options: {
                method: "POST",
                headers: {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...action,
                        painLevelId: getPainLevel(store.getState()),
                        selectedIlnessId: getSelectedIllnesse(store.getState())
                    })
                }
            },
            successAction: FormSubmitted,
            refetchAction: undefined,
            failureAction: FormSubmitionFailed,
            action
        })
    });
}
