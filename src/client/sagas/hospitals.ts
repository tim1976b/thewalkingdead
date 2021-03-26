import { takeLatest } from "redux-saga/effects";
import { FETCH_HOSPITALS, hospitalsFetched } from "../actions/hospitals";
import { doFetch } from "./common";
import { AnyAction } from "redux";
import { hospitalsUrl } from "../../common/constants";

export function* fetchHospitalsWatcher() {

    yield takeLatest(FETCH_HOSPITALS, function* (action: AnyAction) {
        yield doFetch({
            url: hospitalsUrl,
            options: {},
            successAction: hospitalsFetched,
            failureAction: hospitalsFetched,
            action,
            responseProcessor
        })
    });

}

const responseProcessor = ({ page, _embedded, _links }: { page: any, _embedded: { hospitals: any }, _links: any }): { page: number, hospitals: any, hasNext: boolean } => {
    return {
        page: page.number,
        hospitals: _embedded.hospitals,
        hasNext: !!_links.next
    };
}