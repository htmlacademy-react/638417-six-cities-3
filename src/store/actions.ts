import { createAction } from '@reduxjs/toolkit';
import { TOffer } from '../types/offers';
import { SortType } from '../consts';

export const setCity = createAction<string>('filter/setCity');
export const setSort = createAction<SortType>('filter/setSort');
export const setOffers = createAction<TOffer[]>('offers/setOffers');
