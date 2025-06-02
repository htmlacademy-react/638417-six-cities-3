import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../types/offers';

export const setCity = createAction<string>('filter/setCity');
export const setOffers = createAction<TOffer[]>('offers/setOffers');
