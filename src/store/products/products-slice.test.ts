import reducer, {
  fetchProductsFailed,
  fetchProductsRequested,
  fetchProductsSucceeded,
} from './products-slice';
import type { Product } from '@/types';

const initial = reducer(undefined, { type: '@@INIT' });

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

describe('products slice', () => {
  it('starts idle and empty', () => {
    expect(initial).toEqual({ items: [], status: 'idle', error: null });
  });

  it('marks loading when a fetch is requested', () => {
    const state = reducer(initial, fetchProductsRequested());
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('stores items on success', () => {
    const state = reducer(initial, fetchProductsSucceeded(sample));
    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(1);
  });

  it('records the error on failure', () => {
    const state = reducer(initial, fetchProductsFailed('network down'));
    expect(state.status).toBe('failed');
    expect(state.error).toBe('network down');
  });
});
