import { createSlice } from '@reduxjs/toolkit';
import { TOffer } from '../../types/offers';
import { RequestStatus } from '../../consts';
import { fetchAllFavorites } from '../thunks/favorites';

type TAllFavoritesInitialState = {
  info: TOffer[];
  status: RequestStatus;
  error: string | null;
};

const initialState: TAllFavoritesInitialState = {
  info: [],
  status: RequestStatus.Idle,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFavorites.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(fetchAllFavorites.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchAllFavorites.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.error.message ?? 'Oops, something went wrong';
      });
  }
});

export default favoritesSlice;
