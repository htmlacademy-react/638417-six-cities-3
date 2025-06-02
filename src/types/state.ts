import { store } from '../store';
import { TOffer } from './offers';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type TStateFilterData = {
  city: string;
  offers: TOffer[];
}
