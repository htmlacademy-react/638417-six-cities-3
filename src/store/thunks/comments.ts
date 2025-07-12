import type { AxiosError, AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoint } from '../../consts';
import { TReview, TReviewData } from '../../types/reviews';
import { TValidationErrorResponse } from '../../types/validarion';
import { extractFieldErrors } from '../../helpers';

const fetchOfferComments = createAsyncThunk<
  TReview[],
  string,
  { extra: AxiosInstance }
>(
  'comments/getAll',
  async (id, { extra: api }) => {
    const response = await api.get<TReview[]>(`${Endpoint.Comments}/${id}`);
    return response.data;
  }
);

type PostCommentsProps = {
  body : TReviewData;
  id: string;
}

const postOfferComments = createAsyncThunk<
  TReview,
  PostCommentsProps,
  {
    extra: AxiosInstance;
    rejectValue: {
      message: string;
      emailError?: string;
      passwordError?: string;
      ratingError?: string;
      commentError?: string;
    };
  }
>(
  'comments/post',
  async ({body, id}, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post<TReview>(`${Endpoint.Comments}/${id}`, body);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<TValidationErrorResponse>;

      if (err.response?.data?.details) {

        const { ratingError, commentError } = extractFieldErrors(err.response.data.details);

        return rejectWithValue({
          message: err.response.data.message || 'Validation error',
          ratingError,
          commentError
        });
      }

      return rejectWithValue({ message: err.message || 'Login failed' });
    }
  }
);


export { fetchOfferComments, postOfferComments };
