import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getLayoutState } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MouseEventHandler } from 'react';
import { logout } from '../../store/thunks/user';

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  const { rootClassName , linkCalssName, isRenderUser, isRenderfooter } = getLayoutState(pathname as AppRoute);
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  type THandleChange = MouseEventHandler<HTMLAnchorElement>

  const handleSignOut: THandleChange = (evt) => {
    evt.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={`page ${rootClassName }`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {pathname !== String(AppRoute.Root) ? (
                <Link to={AppRoute.Root} className={`header__logo-link ${linkCalssName}`}>
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width={81}
                    height={41}
                  />
                </Link>
              ) : (
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              )}
            </div>
            {
              isRenderUser ? (
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to={AppRoute.Favorites}
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {user?.avatarUrl && <img src={user?.avatarUrl} style={{borderRadius: '50%'}} />}
                        </div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">
                              {user?.email}
                            </span>
                            <span className="header__favorite-count">3</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}

                      </Link>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <a className="header__nav-link" href="#" onClick={handleSignOut}>
                          <span className="header__signout">Sign out</span>
                        </a>
                      </li>
                    ) : null}

                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
      {isRenderfooter ? (
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </a>
        </footer>
      ) : null}
    </div>
  );
}

export default Layout;
