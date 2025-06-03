import { store } from '../store';
import { TOffer } from './offers';

export type TState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export type TStateFilterData = {
  city: string;
  offers: TOffer[];
}
