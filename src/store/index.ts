import { createAPI as api } from '../services/api';
import { filterReducer } from './slices/filter';
import { offersReducer } from './slices/offers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
