import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TOffer } from '../../types/offers';
import { Endpoint } from '../../consts';
import { TReviews } from '../../types/reviews';

const fetchOffer = createAsyncThunk<
  TOffer,
  string,
  { extra: AxiosInstance }
>(
  'fetchOffer/info',
  async (id, { extra: api }) => {
    const response = await api.get<TOffer>(`${Endpoint.Offers}/${id}`);
    return response.data;
  }
);

const fetchOfferNearby = createAsyncThunk<
  TOffer[],
  string,
  { extra: AxiosInstance }
>(
  'fetchOffer/nearby',
  async (id, { extra: api }) => {
    const response = await api.get<TOffer[]>(`${Endpoint.Offers}/${id}/nearby`);
    return response.data;
  }
);

const fetchOfferComments = createAsyncThunk<
  TReviews,
  string,
  { extra: AxiosInstance }
>(
  'fetchOffer/comments',
  async (id, { extra: api }) => {
    const response = await api.get<TReviews>(`${Endpoint.Comments}/${id}`);
    return response.data;
  }
);


export { fetchOffer, fetchOfferNearby, fetchOfferComments };
