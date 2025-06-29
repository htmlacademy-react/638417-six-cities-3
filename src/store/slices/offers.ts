import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { offers as mockOffers} from '../../mocks/offers';
import { TOffer } from '../../types/offers';

type TOffersInitialState = TOffer[];

const initialState: TOffersInitialState = mockOffers;

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setOffers(_state, action: PayloadAction<TOffer[]>) {
      return action.payload;
    }
  }
});

export const { setOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
