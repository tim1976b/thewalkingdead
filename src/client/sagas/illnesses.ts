import { takeLatest } from "redux-saga/effects";
import { FETCH_ILLNESSES, illnessesFetched } from "../actions/illnesses";
import { doFetch } from "./common";
import { AnyAction } from "redux";
import { illnessesUrl } from "../../common/constants"

export function* fetchIllnessesWatcher() {

    yield takeLatest(FETCH_ILLNESSES, function* (action: AnyAction) {
        yield doFetch({
            url: illnessesUrl,
            options: {},
            successAction: illnessesFetched,
            refetchAction: undefined,
            failureAction: illnessesFetched, // XXX create fetch error action
            action,
            responseProcessor
        })
    });
}

// XXX Create and share types under common 
const responseProcessor = ({ page, _embedded, _links }: { page: any, _embedded: { illnesses: any }, _links: any }): { page: number, illnesses: any, hasNext: boolean } => {
    return {
        page: page.number,
        illnesses: _embedded.illnesses,
        hasNext: !!_links.next,
    };
}
