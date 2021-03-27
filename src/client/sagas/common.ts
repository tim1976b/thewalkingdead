import { call, put, fork } from "redux-saga/effects";
import { Action } from "redux";
import { ActionFunctionAny } from "redux-actions";
import { pageSize } from "../../common/constants";

type Payload = { page?: number }

type ActionType = { payload?: Payload } & Action<any>

type DoFetchPayload = {
    url: string,
    options: {},
    successAction: ActionFunctionAny<Action<any>>,
    refetchAction: ActionFunctionAny<Action<any>> | undefined,
    failureAction: ActionFunctionAny<Action<any>>,
    action: ActionType,
    responseProcessor?: (response: any) => any
};

const buildUrl = (url: string, payload?: Payload): string => {
    if (payload && payload.page) {
        return `${url}?limit=${pageSize}&page=${payload.page}`
    } else {
        return url;
    }
}

export function* doFetch(doFetchPayload: DoFetchPayload) {

    const { url, options, successAction, failureAction, action, responseProcessor, refetchAction } = doFetchPayload;
    const builtUrl = buildUrl(url, action.payload);
    const response: Response = yield call(fetch, builtUrl, options);

    // XXX where is try ... catch ?
    if (response.status === 200) {
        const jsonResponse: string = yield call([response, response.json]);
        const processedResponse = responseProcessor ? responseProcessor(jsonResponse) : jsonResponse;
        yield put(successAction(processedResponse));
        if (refetchAction && processedResponse.hasNext) {
            yield fork(fetchResource, processedResponse.page.number + 1);
        }
    } else {
        yield put(failureAction(status));
    }



    function* fetchResource(resource: any) {
        if (refetchAction)
            yield put(refetchAction({ page: resource }));
    }

};// XXX add retry 3 attempts then send failureAction 