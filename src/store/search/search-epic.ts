import { type Epic } from 'redux-observable';
import { type Action } from '@reduxjs/toolkit';
import { from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';
import { productsApi } from '@/api/products-api';
import { extractApiError } from '@/lib/errors';
import type { RootState } from '../root-reducer';
import { searchChanged, searchFailed, searchSucceeded } from './search-slice';

export type AppEpic = Epic<Action, Action, RootState>;

/**
 * Live-search epic (Redux-Observable / RxJS).
 *
 *   keystrokes ─▶ debounce(300ms) ─▶ drop empties ─▶ distinct ─▶ switchMap(api)
 *
 * `switchMap` cancels the previous request when a newer query arrives, so only
 * the latest result ever reaches the store.
 */
export const searchEpic: AppEpic = (action$) =>
  action$.pipe(
    filter(searchChanged.match),
    debounceTime(300),
    map((action) => action.payload.trim()),
    filter((query) => query.length > 0),
    distinctUntilChanged(),
    switchMap((query) =>
      from(productsApi.search(query)).pipe(
        map((results) => searchSucceeded(results)),
        catchError((error) =>
          of(searchFailed(extractApiError(error, 'Помилка пошуку'))),
        ),
      ),
    ),
  );
