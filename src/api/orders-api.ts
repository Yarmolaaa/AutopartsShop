import { HttpClient } from './http-client';
import type { OrderConfirmation, OrderPayload } from '@/types';

/** Child client for the /orders endpoint (extends the base HttpClient). */
class OrdersApi extends HttpClient {
  constructor() {
    super('/orders');
  }

  placeOrder(payload: OrderPayload): Promise<OrderConfirmation> {
    return this.post<OrderConfirmation>('', payload);
  }
}

export const ordersApi = new OrdersApi();
