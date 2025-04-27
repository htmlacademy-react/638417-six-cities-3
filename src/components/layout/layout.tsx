import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthorizationStatus, getLayoutState } from '../../helpers';

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  const { rootClassName , linkCalssName, isRenderUser, isRenderfooter } = getLayoutState(pathname as AppRoute);
  const authorizationStatus = getAuthorizationStatus();

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
                      <a
                        className="header__nav-link header__nav-link--profile"
                        href="#"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        {authorizationStatus === AuthorizationStatus.Auth ? (
                          <>
                            <span className="header__user-name user__name">
                        Oliver.conner@gmail.com
                            </span>
                            <span className="header__favorite-count">3</span>
                          </>
                        ) : <span className="header__login">Sign in</span>}

                      </a>
                    </li>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <li className="header__nav-item">
                        <a className="header__nav-link" href="#">
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
