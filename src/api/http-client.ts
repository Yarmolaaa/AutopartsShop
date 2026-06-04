import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '@/config';

/**
 * The single Axios instance every API client shares.
 *
 * Sharing one instance means the mock adapter (src/api/mock) only has to attach
 * to ONE object to intercept the whole app. Swap to a real backend by changing
 * `API_BASE_URL` and not calling `setupMockApi()`.
 */
export const apiInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the (fake) bearer token to every outgoing request.
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Base HTTP client (coursework section 3.4).
 *
 * Implements the four verbs required by the spec — get / post / update / delete —
 * and is meant to be EXTENDED by resource-specific child classes
 * (see AuthApi, ProductsApi). Children pass their resource path to `super(...)`;
 * every request is then prefixed with it.
 */
export class HttpClient {
  protected readonly client: AxiosInstance;
  protected readonly resource: string;

  constructor(resource = '', client: AxiosInstance = apiInstance) {
    this.resource = resource;
    this.client = client;
  }

  private path(url: string): string {
    return `${this.resource}${url}`;
  }

  protected async get<T>(url = '', config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(this.path(url), config);
    return response.data;
  }

  protected async post<T>(
    url = '',
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(this.path(url), body, config);
    return response.data;
  }

  /** HTTP PUT — full-resource update (spec calls this "update"). */
  protected async update<T>(
    url = '',
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(this.path(url), body, config);
    return response.data;
  }

  protected async delete<T>(url = '', config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(this.path(url), config);
    return response.data;
  }
}
