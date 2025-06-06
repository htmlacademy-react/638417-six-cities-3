import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers, setSort } from './actions';
import { offers } from '../mocks/offers';

import { TOffer } from '../types/offers';
import { TStateFilter } from '../types/state';
import { SortType } from '../consts';

type TinitialAtate = {
  filter: TStateFilter;
  offers: TOffer [];
}

const initialState: TinitialAtate = {
  filter: {
    city: '',
    sort: SortType.Popular
  },
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.filter.city = action.payload;
    })
    .addCase(setSort, (state, action) => {
      state.filter.sort = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
