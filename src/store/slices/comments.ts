import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '../../consts';
import { RootState } from '../../types/state';
import { TReviews } from '../../types/reviews';
import { fetchOfferComments } from '../thunks/comments';

type TOfferInitialState = {
  info: TReviews[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TOfferInitialState = {
  info: [],
  status: RequestStatus.Idle,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferComments.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchOfferComments.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      });

  }
});

export const selectComments = (state: RootState) => state.comments.info;
export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectCommentsError = (state: RootState) => state.comments.error;
export default commentsSlice;
