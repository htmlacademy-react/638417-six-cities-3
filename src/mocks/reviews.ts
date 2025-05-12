import { TReviews } from '../types/reviews';

export const reviews: TReviews[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 'c23aa4be-2d21-4c58-9138-fd6bc64cf8b4',
    date: '2020-07-12T10:45:30.000Z',
    user: {
      name: 'Sophie Müller',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true
    },
    comment: 'The apartment was clean and well-located. The host was friendly and helpful throughout our stay.',
    rating: 5
  },
  {
    id: '3fb8c5fd-7b32-4e27-b987-1c7fae4f07a5',
    date: '2021-03-19T18:27:11.000Z',
    user: {
      name: 'Liam Johnson',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    comment: 'Nice place, but a bit noisy at night due to nearby traffic. Still, a good value for the price.',
    rating: 3
  }
];
