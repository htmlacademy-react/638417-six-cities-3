import { RootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';

const selectOfferState = (state: RootState) => state.offer;

export const selectOffer = createSelector(
  selectOfferState,
  (state) => state.info
);

export const selectOfferNearby = createSelector(
  selectOfferState,
  (state) => state.nearby
);

export const selectOfferStatus = createSelector(
  selectOfferState,
  (state) => state.status
);

export const selectOfferError = createSelector(
  selectOfferState,
  (state) => state.error
);
