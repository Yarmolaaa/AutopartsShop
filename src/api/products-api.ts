import { HttpClient } from './http-client';
import type { Product } from '@/types';

/** Child client for the /products endpoints (extends the base HttpClient). */
class ProductsApi extends HttpClient {
  constructor() {
    super('/products');
  }

  /** All products. */
  getAll(): Promise<Product[]> {
    return this.get<Product[]>('');
  }

  /** Server-side search — used by the live-search epic (Redux-Observable). */
  search(query: string): Promise<Product[]> {
    return this.get<Product[]>('', { params: { search: query } });
  }

  /** A single product by id — used by React Query on the details page. */
  getById(id: number): Promise<Product> {
    return this.get<Product>(`/${id}`);
  }
}

export const productsApi = new ProductsApi();
