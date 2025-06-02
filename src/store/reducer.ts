import { createReducer } from '@reduxjs/toolkit';
import { setCity } from './actions';
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
    });
});

export {reducer};
