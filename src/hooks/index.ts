import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, TAppDispatch} from '../types/state';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

