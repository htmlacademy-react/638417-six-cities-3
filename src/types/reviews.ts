import { TUser } from './offers';

export type TReviews = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
