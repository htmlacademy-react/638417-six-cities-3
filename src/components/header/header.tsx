import { memo, MouseEventHandler, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { logout } from '../../store/thunks/user';
import User from '../user/user';

type HeaderProps = {
  pathname: string;
  linkCalssName: string;
  isRenderUser: boolean;
}

function Header({ pathname, linkCalssName, isRenderUser }: HeaderProps): JSX.Element {

  type THandleChange = MouseEventHandler<HTMLAnchorElement>

  const dispatch = useAppDispatch();

  const handleSignOut = useCallback<THandleChange>((evt) => {
    evt.preventDefault();
    dispatch(logout());
  }, [dispatch]);

  return (
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
              <User handleSignOut={handleSignOut}/>
            ) : null
          }
        </div>
      </div>
    </header>
  );
}

const MemoHeader = memo(Header);
export default MemoHeader;
