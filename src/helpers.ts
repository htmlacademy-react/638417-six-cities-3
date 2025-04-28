import { AppRoute, AuthorizationStatus } from './consts';

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
