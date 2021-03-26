import { all } from "redux-saga/effects"
import { fetchHospitalsWatcher } from "./hospitals";
import { fetchIllnessesWatcher } from "./illnesses";

export default function* rootSaga() {
    yield all([
        fetchHospitalsWatcher(),
        fetchIllnessesWatcher()
    ]);
}
