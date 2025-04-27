export type TLocation = {
  'latitude': number;
  'longitude': number;
  'zoom': number;
}

export type TAppartType = 'apartment' | 'room' | 'house' | 'hotel';

export type THost = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TCity = {
  name: string;
  location: TLocation;
}

export type TOffer = {
  id: string;
  title: string;
  type: TAppartType;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description?: string;
  bedrooms: number;
  goods: string[];
  host: THost;
  images: string[];
  maxAdults: number;
  previewImage?: string;
}
