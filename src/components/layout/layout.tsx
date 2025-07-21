import { Outlet, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { getLayoutState } from '../../helpers';
import Footer from '../footer/footer';
import Header from '../header/header';

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  const { rootClassName, linkCalssName, isRenderUser, isRenderfooter } = getLayoutState(pathname as AppRoute);

  return (
    <div className={`page ${rootClassName }`}>
      <Header pathname={pathname} linkCalssName={linkCalssName} isRenderUser={isRenderUser} />
      <Outlet />
      {isRenderfooter ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default Layout;
