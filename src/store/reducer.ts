import { createReducer } from '@reduxjs/toolkit';
import { setCity, setSort } from './actions';
import { TStateFilter } from '../types/state';
import { SortType } from '../consts';

const initialState: TStateFilter = {
  city: '',
  sort: SortType.Popular
};

const filterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.sort = action.payload;
    });
});

export {filterReducer};
