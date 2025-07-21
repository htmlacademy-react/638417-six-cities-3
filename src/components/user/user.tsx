import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUser } from '../../store/slices/user';

type UserProps = {
  handleSignOut: (evt: MouseEvent<HTMLAnchorElement>) => void;
};

function User({ handleSignOut}: UserProps): JSX.Element {

  const user = useAppSelector(selectUser);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (

    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={AppRoute.Favorites}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {user?.avatarUrl && <img src={user?.avatarUrl} style={{ borderRadius: '50%' }} />}
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
  );
}

const MemoUser = memo(User);
export default MemoUser;
