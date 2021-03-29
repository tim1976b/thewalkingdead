import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { rootReducer } from './reducers';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware: any = [sagaMiddleware, (process.env.NODE_ENV !== 'production') && logger].filter(Boolean);

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware),
);

sagaMiddleware.run(rootSaga);

export { store };