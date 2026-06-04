import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth/auth-slice';
import productsReducer from './products/products-slice';
import searchReducer from './search/search-slice';
import cartReducer from './cart/cart-slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  search: searchReducer,
  cart: cartReducer,
  // redux-form keeps all form state under state.form (section 3.5)
  form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
