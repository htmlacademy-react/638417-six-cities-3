import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../consts';
import { TReviews } from '../../types/reviews';

const fetchOfferComments = createAsyncThunk<
  TReviews[],
  string,
  { extra: AxiosInstance }
>(
  'fetchComments/get',
  async (id, { extra: api }) => {
    const response = await api.get<TReviews[]>(`${Endpoint.Comments}/${id}`);
    return response.data;
  }
);


export { fetchOfferComments };
