import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType } from '../../consts';

export type TFilterInitialState = {
  city: string;
  sort: SortType;
}

const initialState: TFilterInitialState = {
  city: '',
  sort: SortType.Popular
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setSort(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    }
  }
});

export const { setCity, setSort } = filterSlice.actions;
export default filterSlice;
