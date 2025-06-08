import { SortType } from './../consts';
import { store } from '../store';

export type TState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export type TStateFilter = {
  city: string;
  sort: SortType;
}
