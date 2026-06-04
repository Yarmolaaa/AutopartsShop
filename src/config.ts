// Centralised runtime config.
//
// We read `import.meta.env` in exactly ONE place so that Vite-specific syntax
// stays out of the rest of the codebase. The Axios base URL defaults to "/api";
// today every request is intercepted by the mock adapter, so the value only
// matters once you point the app at a real backend.
export const API_BASE_URL: string =
  import.meta.env?.VITE_API_BASE_URL ?? '/api';

// Where the (fake) auth token is persisted so a page refresh keeps you logged in.
export const TOKEN_STORAGE_KEY = 'shop.auth.token';
export const USER_STORAGE_KEY = 'shop.auth.user';

// The cart is persisted so it survives a page refresh too.
export const CART_STORAGE_KEY = 'shop.cart';
