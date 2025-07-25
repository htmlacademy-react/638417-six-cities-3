import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state) => state.info
);


