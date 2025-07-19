import { all } from 'redux-saga/effects';
import { watchLoginSaga } from './auth.saga';
import { watchProductSaga } from './product.saga';
import { watchOrderSaga } from './order.saga';

export default function* rootSaga() {
    yield all([
        watchLoginSaga(),
        watchProductSaga(),
        watchOrderSaga()
    ]);
}