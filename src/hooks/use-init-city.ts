import { useEffect } from 'react';
import { useAppDispatch } from './';
import { setCity } from '../store/actions';
import { AFTER_INIT_CITY } from '../consts';

const useInitCity = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCity(AFTER_INIT_CITY));
  }, [dispatch]);
};

export default useInitCity;
