import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts';

const getLayoutState = (pathName: AppRoute) => {
  let rootClassName = '';
  let linkCalssName = '';
  let isRenderUser = false;

  if (pathName === AppRoute.Root) {
    rootClassName = 'page--gray page--main';
    linkCalssName = 'header__logo-link--active';
    isRenderUser = true;
  } else if (pathName === AppRoute.Login) {
    rootClassName = 'page--gray page--login';
  } else if (pathName === AppRoute.Favorites || pathName === AppRoute.Offer) {
    isRenderUser = true;
  }

  return { rootClassName , linkCalssName, isRenderUser };
};

function Layout(): JSX.Element {
  const { pathname } = useLocation();
  const { rootClassName , linkCalssName, isRenderUser } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page ${rootClassName }`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className={`header__logo-link ${linkCalssName}`}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
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
                        <span className="header__user-name user__name">
                          Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              ) : null
            }
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
