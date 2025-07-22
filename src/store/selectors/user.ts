import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

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
