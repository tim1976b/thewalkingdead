import { takeLatest, takeEvery } from "redux-saga/effects";
import { FETCH_HOSPITALS, hospitalsFetched, fetchHospitals } from "../actions/hospitals";
import { doFetch } from "./common";
import { AnyAction } from "redux";
import { hospitalsUrl } from "../../common/constants";
import { getPainLevel } from "../selectors/pain-level";
import { store } from "../store";

export function* fetchHospitalsWatcher() {

    yield takeLatest(FETCH_HOSPITALS, function* (action: AnyAction) {
        yield doFetch({
            url: hospitalsUrl,
            options: {},
            successAction: hospitalsFetched,
            refetchAction: fetchHospitals,
            failureAction: hospitalsFetched, // XXX create fetch error action
            action,
            responseProcessor
        })
    });

}

const responseProcessor = ({ page, _embedded, _links }: {
    page: any,
    _embedded: {
        hospitals: [{
            id: string,
            name: "string",
            waitingList: [{
                patientCount: number,
                levelOfPain: number,
                averageProcessTime: number
            },]
        }],
    }, _links: any

}): { page: any, hospitals: any, hasNext: boolean } => {
    const selectedPainLevel = getPainLevel(store.getState());
    return {
        page: page,
        hospitals: _embedded.hospitals.map(hospital => ({
            id: hospital.id,
            name: hospital.name,
            waitingTime: hospital.waitingList.filter(({ levelOfPain }) => levelOfPain === selectedPainLevel).map(({ patientCount, averageProcessTime }) => patientCount * averageProcessTime)[0],
        })),
        hasNext: !!_links.next
    };
}
