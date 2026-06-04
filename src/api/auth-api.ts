import { HttpClient } from './http-client';
import type {
  AuthResponse,
  Credentials,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from '@/types';

/** Child client for the /auth endpoints (extends the base HttpClient). */
class AuthApi extends HttpClient {
  constructor() {
    super('/auth');
  }

  login(credentials: Credentials): Promise<AuthResponse> {
    return this.post<AuthResponse>('/login', credentials);
  }

  register(payload: RegisterPayload): Promise<AuthResponse> {
    return this.post<AuthResponse>('/register', payload);
  }

  updateProfile(payload: UpdateProfilePayload): Promise<User> {
    return this.update<User>('/profile', payload);
  }
}

export const authApi = new AuthApi();
