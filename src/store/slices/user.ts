import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../consts';
import { checkAuth, login, logout } from '../thunks/user';
import { TUserData } from '../../types/user';
import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

export type TUserInitialState = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: TUserData | null;
};

const initialState: TUserInitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      // login
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        if (action.payload && typeof action.payload === 'object') {
          const payload = action.payload as {
            emailError?: string;
            passwordError?: string;
            message?: string;
          };

          const errorMessages = [
            payload.emailError,
            payload.passwordError
          ].filter(Boolean).join('\n');

          state.error = errorMessages || payload.message || 'Login failed';
        } else {
          state.error = action.error.message ?? 'Login failed';
        }
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message ?? 'Logout failed';
      });
  },
});

const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectAuthorizationStatus = createSelector(
  selectUserState,
  (state) => state.authorizationStatus
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const { setAuthorization } = userSlice.actions;
export default userSlice;
