import { all, fork } from 'redux-saga/effects';
import { productsSaga } from './products/products-saga';

export function* rootSaga() {
  yield all([fork(productsSaga)]);
}
