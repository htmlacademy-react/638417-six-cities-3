import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../consts';
import { TUserData, TUserAuthData } from '../../types/user';

const checkAuth = createAsyncThunk<TUserData, void, { extra: AxiosInstance }>('user/checkAuth', async (_arg, { extra: api }) => {
  const response = await api.get<TUserData>(Endpoint.Login);
  return response.data;
},
);

const login = createAsyncThunk<TUserData, TUserAuthData, { extra: AxiosInstance }>('user/login', async (body, { extra: api }) => {
  const response = await api.post<TUserData>(Endpoint.Login, body);
  return response.data;
},
);

const logout = createAsyncThunk<unknown, void, { extra: AxiosInstance }>('user/logout', async (_arg, { extra: api }) => {
  await api.post<TUserData>(Endpoint.Logout);
},
);

export { checkAuth, login, logout };
