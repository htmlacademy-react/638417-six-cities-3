import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import Spiner from '../spiner/spiner';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
  isReverse?: boolean;
}

function PrivateRoute({authorizationStatus, children, isReverse}:PrivateRouteProps): JSX.Element {
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
