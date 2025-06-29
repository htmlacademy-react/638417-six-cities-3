import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TOffer } from './../../types/offers';
import { Endpoint } from '../../consts';

const fetchAllOffers = createAsyncThunk<
  TOffer[],
  void,
  { extra: AxiosInstance }
>(
  'fetchAllOffers/all',
  async (_arg, { extra: api }) => {

    const response = await api.get<TOffer[]>(Endpoint.Offers);
    return response.data;
  }
);

export { fetchAllOffers };
