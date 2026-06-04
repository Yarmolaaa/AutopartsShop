import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from './http-client';
import { productsApi } from './products-api';
import type { Product } from '@/types';

const product: Product = {
  id: 1,
  title: 'Phone',
  description: 'd',
  price: 9.99,
  category: 'Electronics',
  image: '',
  rating: 4.5,
  stock: 3,
};

// Exercises the base HttpClient verbs through the ProductsApi child + the mock backend.
describe('ProductsApi over HttpClient', () => {
  let mock: MockAdapter;
  beforeEach(() => {
    mock = new MockAdapter(apiInstance);
  });
  afterEach(() => {
    mock.restore();
  });

  it('getAll() GETs /products and unwraps response data', async () => {
    mock.onGet(/\/products$/).reply(200, [product]);
    await expect(productsApi.getAll()).resolves.toEqual([product]);
  });

  it('search() forwards the query as a request param', async () => {
    let received: string | undefined;
    mock.onGet(/\/products$/).reply((config) => {
      received = config.params?.search;
      return [200, [product]];
    });
    await productsApi.search('phone');
    expect(received).toBe('phone');
  });

  it('getById() hits /products/:id', async () => {
    mock.onGet(/\/products\/1$/).reply(200, product);
    await expect(productsApi.getById(1)).resolves.toEqual(product);
  });

  it('rejects when the backend returns 404', async () => {
    mock.onGet(/\/products\/\d+$/).reply(404, { message: 'Product not found' });
    await expect(productsApi.getById(999)).rejects.toThrow();
  });
});
