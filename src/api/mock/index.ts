import MockAdapter from 'axios-mock-adapter';
import { apiInstance } from '../http-client';
import {
  makeToken,
  nextUserId,
  products,
  toPublicUser,
  userIdFromToken,
  users,
  type StoredUser,
} from './data';
import type { Credentials, RegisterPayload, UpdateProfilePayload } from '@/types';

/**
 * Wire up the fake backend on the shared Axios instance.
 *
 * Matchers are end-anchored RegExps so they work whether or not Axios has
 * already prefixed the baseURL ("/api"). Returns the adapter so callers can
 * `.restore()` it (used in tests).
 */
export function setupMockApi(delayMs = 400): MockAdapter {
  const mock = new MockAdapter(apiInstance, { delayResponse: delayMs });
  let orderCounter = 1000;

  // ---- Products -----------------------------------------------------------

  // GET /products  (optionally ?search=) — list + live search
  mock.onGet(/\/products$/).reply((config) => {
    const search = String(config.params?.search ?? '').trim().toLowerCase();
    if (!search) return [200, products];
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search),
    );
    return [200, filtered];
  });

  // GET /products/:id — single product (React Query)
  mock.onGet(/\/products\/\d+$/).reply((config) => {
    const id = Number(config.url?.split('/').pop());
    const product = products.find((p) => p.id === id);
    return product ? [200, product] : [404, { message: 'Товар не знайдено' }];
  });

  // ---- Auth ---------------------------------------------------------------

  // POST /auth/login
  mock.onPost(/\/auth\/login$/).reply((config) => {
    const { email, password } = JSON.parse(config.data) as Credentials;
    const user = users.find((u) => u.email === email.toLowerCase().trim());
    if (!user || user.password !== password) {
      return [401, { message: 'Невірна пошта або пароль' }];
    }
    return [200, { token: makeToken(user.id), user: toPublicUser(user) }];
  });

  // POST /auth/register
  mock.onPost(/\/auth\/register$/).reply((config) => {
    const { name, email, password } = JSON.parse(config.data) as RegisterPayload;
    const normalized = email.toLowerCase().trim();
    if (users.some((u) => u.email === normalized)) {
      return [409, { message: 'Акаунт із такою поштою вже існує' }];
    }
    const user: StoredUser = { id: nextUserId(), name, email: normalized, password };
    users.push(user);
    return [201, { token: makeToken(user.id), user: toPublicUser(user) }];
  });

  // PUT /auth/profile — update the logged-in user (identified by the token)
  mock.onPut(/\/auth\/profile$/).reply((config) => {
    const userId = userIdFromToken(config.headers?.Authorization as string);
    const user = users.find((u) => u.id === userId);
    if (!user) return [401, { message: 'Не авторизовано' }];
    const { name, email } = JSON.parse(config.data) as UpdateProfilePayload;
    user.name = name;
    user.email = email.toLowerCase().trim();
    return [200, toPublicUser(user)];
  });

  // ---- Orders -------------------------------------------------------------

  // POST /orders — place an order, return a confirmation number
  mock.onPost(/\/orders$/).reply((config) => {
    const body = JSON.parse(config.data);
    orderCounter += 1;
    return [201, { orderId: `UA-${orderCounter}`, ...body }];
  });

  return mock;
}
