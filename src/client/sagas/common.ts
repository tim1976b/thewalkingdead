import { call, put } from "redux-saga/effects";
import { Action } from "redux";
import { ActionFunctionAny } from "redux-actions";
import { pageSize } from "../../common/constants";

type Payload = { page?: number }

type ActionType = { payload?: Payload } & Action<any>

type DoFetchPayload = {
    url: string,
    options: {},
    successAction: ActionFunctionAny<Action<any>>,
    failureAction: ActionFunctionAny<Action<any>>,
    action: ActionType,
    responseProcessor?: (response: any) => any
};

const buildUrl = (url: string, payload?: Payload): string => {
    if (!payload) {
        return `${url}?limit=${pageSize}&page=0`
    } else {
        return `${url}?limit=${pageSize}&page=${payload.page}`
    }
}

export function* doFetch(doFetchPayload: DoFetchPayload) {

    const { url, options, successAction, failureAction, action, responseProcessor } = doFetchPayload;
    const builtUrl = buildUrl(url, action.payload);
    const response: Response = yield call(fetch, builtUrl, options);

    // XXX where is try ... catch ?
    if (response.status === 200) {
        const jsonResponse: string = yield call([response, response.json]);
        const processedResponse = responseProcessor ? responseProcessor(jsonResponse) : jsonResponse;
        yield put(successAction(processedResponse));
    } else {
        yield put(failureAction(status));
    }

};// XXX add retry 3 attempts then send failureAction 