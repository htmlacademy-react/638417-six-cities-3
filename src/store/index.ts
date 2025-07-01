import { createAPI } from '../services/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import filterSlice from './slices/filter';
import offersSlice from './slices/offers';
import userSlice from './slices/user';

export const api = createAPI();

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [filterSlice.name]: filterSlice.reducer,
  [userSlice.name]: userSlice.reducer,
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
