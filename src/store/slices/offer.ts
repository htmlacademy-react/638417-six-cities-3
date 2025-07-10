import { createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { RequestStatus } from '../../consts';
import { fetchOffer, fetchOfferNearby } from '../thunks/offer';
import { RootState } from '../../types/state';

type TOfferInitialState = {
  info: TOffer | null;
  nearby: TOffer[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TOfferInitialState = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle,
  error: null,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      })

    //Nearby
      .addCase(fetchOfferNearby.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchOfferNearby.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.nearby = action.payload;
      })
      .addCase(fetchOfferNearby.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      });
  }
});

export const selectOffer = (state: RootState) => state.offer.info;
export const selectOfferNearby = (state: RootState) => state.offer.nearby;
export const selectOfferStatus = (state: RootState) => state.offer.status;
export const selectOfferError = (state: RootState) => state.offer.error;
export default offerSlice;
