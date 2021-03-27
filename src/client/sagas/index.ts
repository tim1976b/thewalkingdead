import { all } from "redux-saga/effects"
import { fetchHospitalsWatcher } from "./hospitals";
import { fetchIllnessesWatcher } from "./illnesses";
import { submitFormWatcher } from "./form";

export default function* rootSaga() {
    yield all([
        fetchHospitalsWatcher(),
        fetchIllnessesWatcher(),
        submitFormWatcher()
    ]);
}
