import { offersReducer } from './slices/offers';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './reducer';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    filter: filterReducer
  }
});
