import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './actions';
import { offers } from '../mocks/offers';
import { TStateFilterData } from '../types/state';


const initialState: TStateFilterData = {
  city: offers[0].city.name,
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
