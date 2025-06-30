import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { RequestStatus } from '../../consts';
import { fetchAllOffers } from '../thunks/offers';

type TOffersInitialState = {
  offers: TOffer[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TOffersInitialState = {
  offers: [],
  status: RequestStatus.Idle,
  error: null,
};

const offersSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      });
  },
  name: 'offers',
  initialState,
  reducers: {
    setOffers(state, action: PayloadAction<TOffer[]>) {
      state.offers = action.payload;
    }
  }
});

export const { setOffers } = offersSlice.actions;
export default offersSlice;
