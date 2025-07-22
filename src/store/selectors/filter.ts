import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const selectFilterState = (state: RootState) => state.filter;

export const selectCity = createSelector(
  selectFilterState,
  (state) => state.city
);

export const selectSort = createSelector(
  selectFilterState,
  (state) => state.sort
);

