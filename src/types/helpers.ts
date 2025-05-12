import { TOffer } from './offers';

export type GroupedOffer = {
  city: string;
  offers: TOffer[];
};

export type TReviewDate = {
  dateTime: string;
  dateTextContent: string;
}
