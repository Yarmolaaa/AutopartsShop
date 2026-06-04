import { configureStore, type Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, type RootState } from './root-reducer';
import { rootSaga } from './root-saga';
import { rootEpic } from './root-epic';
import { CART_STORAGE_KEY } from '@/config';

// Three middleware, three async strategies:
//  - redux-thunk      → bundled by RTK's getDefaultMiddleware (auth)
//  - redux-saga       → products fetch
//  - redux-observable → live search
const sagaMiddleware = createSagaMiddleware();
const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-form stores plain data, but disabling the check keeps the
      // console clean and avoids false positives on async action meta.
      serializableCheck: false,
    }).concat(sagaMiddleware, epicMiddleware),
  // Redux DevTools (section 3.2) — on in dev, off in production builds.
  devTools: import.meta.env?.MODE !== 'production',
});

sagaMiddleware.run(rootSaga);
epicMiddleware.run(rootEpic);

// Persist the cart to localStorage whenever it changes (so a refresh keeps it).
let prevItems = store.getState().cart.items;
store.subscribe(() => {
  const items = store.getState().cart.items;
  if (items !== prevItems) {
    prevItems = items;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage quota errors */
    }
  }
});

export type AppDispatch = typeof store.dispatch;
export type { RootState };
