import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { ordersApi } from '@/api/orders-api';
import { extractApiError } from '@/lib/errors';
import { CART_STORAGE_KEY } from '@/config';
import type {
  CartItem,
  OrderConfirmation,
  OrderPayload,
  Product,
  Status,
} from '@/types';

interface CartState {
  items: CartItem[];
  orderStatus: Status;
  error: string | null;
  lastOrderId: string | null;
}

function loadItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

const initialState: CartState = {
  items: loadItems(),
  orderStatus: 'idle',
  error: null,
  lastOrderId: null,
};

/** Checkout — the one async cart action (Redux-Thunk → mock POST /orders). */
export const placeOrder = createAsyncThunk<
  OrderConfirmation,
  OrderPayload,
  { rejectValue: string }
>('cart/placeOrder', async (payload, { rejectWithValue }) => {
  try {
    return await ordersApi.placeOrder(payload);
  } catch (error) {
    return rejectWithValue(
      extractApiError(error, 'Не вдалося оформити замовлення'),
    );
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, product.stock);
      } else {
        state.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(
          1,
          Math.min(action.payload.quantity, item.product.stock),
        );
      }
    },
    clearCart(state) {
      state.items = [];
    },
    resetOrder(state) {
      state.orderStatus = 'idle';
      state.error = null;
      state.lastOrderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderStatus = 'loading';
        state.error = null;
      })
      .addCase(
        placeOrder.fulfilled,
        (state, action: PayloadAction<OrderConfirmation>) => {
          state.orderStatus = 'succeeded';
          state.lastOrderId = action.payload.orderId;
          state.items = []; // empty the cart on success
        },
      )
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload ?? 'Не вдалося оформити замовлення';
      });
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart, resetOrder } =
  cartSlice.actions;

// ---- Selectors ------------------------------------------------------------
export const selectCartItems = (s: { cart: CartState }) => s.cart.items;
export const selectCartCount = (s: { cart: CartState }) =>
  s.cart.items.reduce((n, i) => n + i.quantity, 0);
export const selectCartTotal = (s: { cart: CartState }) =>
  s.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export default cartSlice.reducer;
