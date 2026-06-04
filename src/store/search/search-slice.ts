import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, Status } from '@/types';

interface SearchState {
  query: string;
  results: Product[];
  status: Status;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  status: 'idle',
  error: null,
};

/**
 * `searchChanged` fires on every keystroke. The Redux-Observable epic debounces
 * the stream and performs the request; an empty query resets to idle so the UI
 * falls back to the full product list.
 */
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchChanged(state, action: PayloadAction<string>) {
      state.query = action.payload;
      if (!action.payload.trim()) {
        state.results = [];
        state.status = 'idle';
        state.error = null;
      } else {
        state.status = 'loading';
      }
    },
    searchSucceeded(state, action: PayloadAction<Product[]>) {
      state.status = 'succeeded';
      state.results = action.payload;
    },
    searchFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { searchChanged, searchSucceeded, searchFailed } =
  searchSlice.actions;

export default searchSlice.reducer;
