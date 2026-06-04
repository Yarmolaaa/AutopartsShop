import { call, put } from 'redux-saga/effects';
import { fetchProductsWorker } from './products-saga';
import {
  fetchProductsFailed,
  fetchProductsSucceeded,
} from './products-slice';
import { productsApi } from '@/api/products-api';
import type { Product } from '@/types';

const sample: Product[] = [
  {
    id: 1,
    title: 'X',
    description: '',
    price: 10,
    category: 'C',
    image: '',
    rating: 4,
    stock: 1,
  },
];

describe('fetchProductsWorker saga', () => {
  it('calls the API then dispatches success', () => {
    const gen = fetchProductsWorker();
    // first yield: the API call
    expect(gen.next().value).toEqual(call([productsApi, productsApi.getAll]));
    // feeding the resolved value should dispatch success
    expect(gen.next(sample).value).toEqual(put(fetchProductsSucceeded(sample)));
    expect(gen.next().done).toBe(true);
  });

  it('dispatches failure when the API throws', () => {
    const gen = fetchProductsWorker();
    gen.next(); // advance to the call
    const effect = gen.throw(new Error('network down')).value;
    expect(effect).toEqual(put(fetchProductsFailed('network down')));
    expect(gen.next().done).toBe(true);
  });
});
