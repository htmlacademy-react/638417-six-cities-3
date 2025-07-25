import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../consts';

import { TOffer } from '../../types/offers';


const fetchAllFavorites = createAsyncThunk<
  TOffer[],
  void,
  { extra: AxiosInstance }
>(
  'favorites/fetchAll',
  async (_arg, { extra: api }) => {

    const response = await api.get<TOffer[]>(Endpoint.Favorite);
    return response.data;
  }
);


export {fetchAllFavorites };
