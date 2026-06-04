import { firstValueFrom, of } from 'rxjs';
import { toArray } from 'rxjs/operators';

// Mock the API so the epic's switchMap resolves deterministically.
jest.mock('@/api/products-api', () => ({
  productsApi: { search: jest.fn(), getAll: jest.fn(), getById: jest.fn() },
}));

import { productsApi } from '@/api/products-api';
import { searchEpic } from './search-epic';
import { searchChanged, searchFailed, searchSucceeded } from './search-slice';
import type { Product } from '@/types';

const mockedSearch = productsApi.search as jest.Mock;

const results: Product[] = [
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

// `of(action)` completes synchronously, so debounceTime flushes the pending
// value on completion — no fake timers needed.
function runEpic(action: ReturnType<typeof searchChanged>) {
  return firstValueFrom(
    // state$ + dependencies are unused by this epic
    searchEpic(of(action), {} as never, {} as never).pipe(toArray()),
  );
}

describe('searchEpic (Redux-Observable)', () => {
  it('maps a query to searchSucceeded with the API results', async () => {
    mockedSearch.mockResolvedValueOnce(results);
    const out = await runEpic(searchChanged('phone'));
    expect(mockedSearch).toHaveBeenCalledWith('phone');
    expect(out).toEqual([searchSucceeded(results)]);
  });

  it('emits searchFailed when the API rejects', async () => {
    mockedSearch.mockRejectedValueOnce(new Error('boom'));
    const out = await runEpic(searchChanged('phone'));
    expect(out).toEqual([searchFailed('boom')]);
  });

  it('ignores empty queries (no API call)', async () => {
    const out = await runEpic(searchChanged('   '));
    expect(mockedSearch).not.toHaveBeenCalled();
    expect(out).toEqual([]);
  });
});
