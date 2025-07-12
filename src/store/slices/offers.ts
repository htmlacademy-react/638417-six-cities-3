import { createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { RequestStatus } from '../../consts';
import { fetchAllOffers } from '../thunks/offers';
import { RootState } from '../../types/state';
import { TReview } from '../../types/reviews';
import { fetchOfferComments, postOfferComments } from '../thunks/comments';

type TAllOffersInitialState = {
  info: TOffer[];
  comments: TReview[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TAllOffersInitialState = {
  info: [],
  comments: [],
  status: RequestStatus.Idle,
  error: null,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
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
      })
      // Comments GetAll

      .addCase(fetchOfferComments.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.comments = action.payload;
      })
      .addCase(fetchOfferComments.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      })

    // Comments Post

      .addCase(postOfferComments.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(postOfferComments.rejected, (state, action) => {

        if (action.payload && typeof action.payload === 'object') {
          const payload = action.payload as {
            ratingError?: string;
            commentError?: string;
            message?: string;
          };

          const errorMessages = [
            payload.ratingError,
            payload.commentError
          ].filter(Boolean).join('\n');

          state.error = errorMessages || payload.message || 'Login failed';
        } else {
          state.error = action.error.message ?? 'Login failed';
        }
      });
  }
});

export const selectOffers = (state: RootState) => state.offers.info;
export const selectComments = (state: RootState) => state.offers.comments;
export const selectOffersStatus = (state: RootState) => state.offers.status;
export const selectOffersError = (state: RootState) => state.offers.error;

export default offersSlice;
