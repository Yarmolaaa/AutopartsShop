import { call, put, takeLatest } from 'redux-saga/effects';
import { productsApi } from '@/api/products-api';
import { extractApiError } from '@/lib/errors';
import type { Product } from '@/types';
import {
  fetchProductsFailed,
  fetchProductsRequested,
  fetchProductsSucceeded,
} from './products-slice';

/** Worker: load all products, then dispatch success/failure. (Exported for unit tests.) */
export function* fetchProductsWorker() {
  try {
    const items: Product[] = yield call([productsApi, productsApi.getAll]);
    yield put(fetchProductsSucceeded(items));
  } catch (error) {
    yield put(
      fetchProductsFailed(
        extractApiError(error, 'Не вдалося завантажити товари'),
      ),
    );
  }
}

/** Watcher: takeLatest cancels a stale in-flight fetch if re-triggered. */
export function* productsSaga() {
  yield takeLatest(fetchProductsRequested.type, fetchProductsWorker);
}
