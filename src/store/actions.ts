import { createAction } from '@reduxjs/toolkit';
import { SortType } from '../consts';

export const setCity = createAction<string>('filter/setCity');
export const setSort = createAction<SortType>('filter/setSort');
