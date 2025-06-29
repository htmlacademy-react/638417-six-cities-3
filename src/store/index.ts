import { createAPI } from '../services/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filter';
import offersSlice from './slices/offers';

export const api = createAPI();

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
