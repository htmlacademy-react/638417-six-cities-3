import { useEffect } from 'react';
import { useAppDispatch } from './';
import { AFTER_INIT_CITY } from '../consts';
import { setCity } from '../store/slices/filter';

const useInitCity = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(AFTER_INIT_CITY));
  }, [dispatch]);
};

export default useInitCity;
