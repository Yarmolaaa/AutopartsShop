import reducer, { loggedOut, login, register, updateProfile } from './auth-slice';
import type { AuthResponse, User } from '@/types';

const user: User = { id: 1, name: 'Demo', email: 'demo@shop.dev' };
const authResponse: AuthResponse = { token: 'tok-123', user };
const creds = { email: 'demo@shop.dev', password: 'password123' };

describe('auth slice', () => {
  const initial = reducer(undefined, { type: '@@INIT' });

  it('flips to loading while a login is pending', () => {
    const state = reducer(initial, login.pending('req', creds));
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('stores user + token on login success', () => {
    const state = reducer(initial, login.fulfilled(authResponse, 'req', creds));
    expect(state.status).toBe('succeeded');
    expect(state.user).toEqual(user);
    expect(state.token).toBe('tok-123');
  });

  it('captures the rejectWithValue message on login failure', () => {
    const state = reducer(
      initial,
      login.rejected(new Error('x'), 'req', creds, 'Invalid email or password'),
    );
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Invalid email or password');
  });

  it('stores user + token on register success', () => {
    const state = reducer(
      initial,
      register.fulfilled(authResponse, 'req', {
        name: 'Demo',
        email: 'demo@shop.dev',
        password: 'password123',
      }),
    );
    expect(state.user).toEqual(user);
    expect(state.token).toBe('tok-123');
  });

  it('updates the user on profile update', () => {
    const loggedIn = reducer(initial, login.fulfilled(authResponse, 'req', creds));
    const updated: User = { id: 1, name: 'New Name', email: 'new@shop.dev' };
    const state = reducer(
      loggedIn,
      updateProfile.fulfilled(updated, 'req', {
        name: 'New Name',
        email: 'new@shop.dev',
      }),
    );
    expect(state.user).toEqual(updated);
    expect(state.token).toBe('tok-123'); // token unchanged
  });

  it('clears everything on logout', () => {
    const loggedIn = reducer(initial, login.fulfilled(authResponse, 'req', creds));
    const state = reducer(loggedIn, loggedOut());
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});
