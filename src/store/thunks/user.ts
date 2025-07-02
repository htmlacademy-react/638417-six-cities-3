import type { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../consts';
import { TUserData, TUserAuthData, TValidationErrorResponse } from '../../types/user';
import { dropToken, saveToken } from '../../services/token';
import { extractFieldErrors } from '../../helpers';

const checkAuth = createAsyncThunk<TUserData, void, { extra: AxiosInstance }>('user/checkAuth', async (_arg, { extra: api }) => {
  const response = await api.get<TUserData>(Endpoint.Login);
  return response.data;
},
);

const login = createAsyncThunk<
  TUserData,
  TUserAuthData,
  {
    extra: AxiosInstance;
    rejectValue: {
      message: string;
      emailError?: string;
      passwordError?: string;
    };
  }
>(
  'user/login',
  async (body, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<TUserData>(Endpoint.Login, body);
      saveToken(response.data.token);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<TValidationErrorResponse>;

      if (err.response?.data?.details) {
        const { emailError, passwordError } = extractFieldErrors(err.response.data.details);

        return rejectWithValue({
          message: err.response.data.message || 'Validation error',
          emailError,
          passwordError
        });
      }

      return rejectWithValue({ message: err.message || 'Login failed' });
    }
  }
);

const logout = createAsyncThunk<unknown, void, { extra: AxiosInstance }>('user/logout', async (_arg, { extra: api }) => {
  await api.delete<TUserData>(Endpoint.Logout);
  dropToken();
},
);

export { checkAuth, login, logout };
