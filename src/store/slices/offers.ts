import { createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { RequestStatus } from '../../consts';
import { fetchAllOffers } from '../thunks/offers';
import { RootState } from '../../types/state';

type TAllOffersInitialState = {
  info: TOffer[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TAllOffersInitialState = {
  info: [],
  status: RequestStatus.Idle,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      });
  }
});

export const selectOffers = (state: RootState) => state.offers.info;
export const selectOffersStatus = (state: RootState) => state.offers.status;
export const selectOffersError = (state: RootState) => state.offers.error;

export default offersSlice;
