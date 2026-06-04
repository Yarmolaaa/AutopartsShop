import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, Status } from '@/types';

interface ProductsState {
  items: Product[];
  status: Status;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

/**
 * The "Requested" action is a saga trigger — it carries no payload and the
 * reducer just flips status to loading. The products saga listens for it,
 * performs the request, and dispatches Succeeded/Failed.
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequested(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchProductsSucceeded(state, action: PayloadAction<Product[]>) {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchProductsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequested,
  fetchProductsSucceeded,
  fetchProductsFailed,
} = productsSlice.actions;

export default productsSlice.reducer;
