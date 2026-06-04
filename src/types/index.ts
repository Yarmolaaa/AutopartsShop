export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
}

/** Generic async lifecycle status used across slices. */
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  cardNumber: string;
}

export interface OrderPayload {
  items: Array<{ id: number; quantity: number }>;
  total: number;
  shipping: ShippingDetails;
}

export interface OrderConfirmation {
  orderId: string;
}
