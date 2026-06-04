import {
  createAsyncThunk,
  createSlice,
  type Dispatch,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { authApi } from '@/api/auth-api';
import { extractApiError } from '@/lib/errors';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '@/config';
import type {
  AuthResponse,
  Credentials,
  RegisterPayload,
  Status,
  UpdateProfilePayload,
  User,
} from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  status: Status;
  error: string | null;
}

function persist(res: AuthResponse): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, res.token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.user));
}

function loadInitialState(): AuthState {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const userRaw = localStorage.getItem(USER_STORAGE_KEY);
  return {
    user: userRaw ? (JSON.parse(userRaw) as User) : null,
    token,
    status: 'idle',
    error: null,
  };
}

// ---- Thunks (Redux-Thunk via createAsyncThunk) ----------------------------

export const login = createAsyncThunk<
  AuthResponse,
  Credentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const res = await authApi.login(credentials);
    persist(res);
    return res;
  } catch (error) {
    return rejectWithValue(extractApiError(error, 'Не вдалося увійти'));
  }
});

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await authApi.register(payload);
    persist(res);
    return res;
  } catch (error) {
    return rejectWithValue(extractApiError(error, 'Не вдалося зареєструватися'));
  }
});

export const updateProfile = createAsyncThunk<
  User,
  UpdateProfilePayload,
  { rejectValue: string }
>('auth/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const user = await authApi.updateProfile(payload);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  } catch (error) {
    return rejectWithValue(extractApiError(error, 'Не вдалося оновити профіль'));
  }
});

// ---- Slice ----------------------------------------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    loggedOut(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Не вдалося увійти';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Не вдалося зареєструватися';
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export const { loggedOut, clearAuthError } = authSlice.actions;

/** Plain hand-written thunk — clears storage, then resets state. */
export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  dispatch(loggedOut());
};

export default authSlice.reducer;
