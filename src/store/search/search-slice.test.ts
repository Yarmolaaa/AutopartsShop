import reducer, {
  searchChanged,
  searchFailed,
  searchSucceeded,
} from './search-slice';
import type { Product } from '@/types';

const initial = reducer(undefined, { type: '@@INIT' });

const sample: Product[] = [
  {
    id: 1,
    title: 'Phone',
    description: '',
    price: 10,
    category: 'C',
    image: '',
    rating: 4,
    stock: 1,
  },
];

describe('search slice', () => {
  it('sets loading for a non-empty query', () => {
    const state = reducer(initial, searchChanged('phone'));
    expect(state.query).toBe('phone');
    expect(state.status).toBe('loading');
  });

  it('resets to idle for an empty query (falls back to full list)', () => {
    const loaded = reducer(
      reducer(initial, searchChanged('phone')),
      searchSucceeded(sample),
    );
    const cleared = reducer(loaded, searchChanged('   '));
    expect(cleared.status).toBe('idle');
    expect(cleared.results).toEqual([]);
  });

  it('stores results on success', () => {
    const state = reducer(initial, searchSucceeded(sample));
    expect(state.status).toBe('succeeded');
    expect(state.results).toHaveLength(1);
  });

  it('records the error on failure', () => {
    const state = reducer(initial, searchFailed('boom'));
    expect(state.status).toBe('failed');
    expect(state.error).toBe('boom');
  });
});
