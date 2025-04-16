import { AuthorizationStatus } from '../../consts';
import LoginScreen from '../../pages/login-screen/login-screen';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute({authorizationStatus, children}:PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <LoginScreen />
  );
}

export default PrivateRoute;
