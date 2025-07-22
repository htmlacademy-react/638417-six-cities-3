import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import Spiner from '../spiner/spiner';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/selectors/user';

type PrivateRouteProps = {
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute({ children, isReverse}:PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spiner />;
  }

  return (
    authorizationStatus === (isReverse ? AuthorizationStatus.NoAuth : AuthorizationStatus.Auth)
      ? children
      : <Navigate to={isReverse ? AppRoute.Root : AppRoute.Login} />
  );
}

export default PrivateRoute;
