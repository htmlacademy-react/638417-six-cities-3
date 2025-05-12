import { AppRoute, AuthorizationStatus } from './consts';
import { GroupedOffer, TReviewDate } from './types/helpers';
import { TOffer } from './types/offers';

export const getAuthorizationStatus = () => AuthorizationStatus.Auth;

export const getLayoutState = (pathName: AppRoute) => {
  let rootClassName = '';
  let linkCalssName = '';
  let isRenderUser = false;
  let isRenderfooter = false;

  if (pathName === AppRoute.Root) {
    rootClassName = 'page--gray page--main';
    linkCalssName = 'header__logo-link--active';
    isRenderUser = true;
  } else if (pathName === AppRoute.Login) {
    rootClassName = 'page--gray page--login';
  } else if (pathName === AppRoute.Favorites) {
    isRenderUser = true;
    isRenderfooter = true;
  } else if (pathName === AppRoute.Offer) {
    isRenderUser = true;
  }

  return { rootClassName , linkCalssName, isRenderUser, isRenderfooter };
};

export function groupOffersByCity(offers: TOffer[]): GroupedOffer[] {
  const grouped = offers.reduce<Record<string, TOffer[]>>((acc, offer) => {
    const cityName = offer.city.name;

    if (!acc[cityName]) {
      acc[cityName] = [];
    }

    acc[cityName].push(offer);

    return acc;
  }, {});

  return Object.entries(grouped).map(([city, cityOffers]) => ({
    city,
    offers: cityOffers,
  }));
}

export function formatDateForTimeTag(rawDate : string, locale:string): TReviewDate {
  const date = new Date(rawDate);
  const dateTime = date.toISOString().split('T')[0];
  const dateTextContent = date.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });
  return { dateTime, dateTextContent };
}
