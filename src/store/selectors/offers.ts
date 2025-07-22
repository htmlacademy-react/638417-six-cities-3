import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const selectOffersState = (state: RootState) => state.offers;

export const selectOffers = createSelector(
  selectOffersState,
  (state) => state.info
);

export const selectComments = createSelector(
  selectOffersState,
  (state) => state.comments
);

export const selectOffersStatus = createSelector(
  selectOffersState,
  (state) => state.status
);

export const selectOffersError = createSelector(
  selectOffersState,
  (state) => state.error
);
