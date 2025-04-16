import { AppRoute, AuthorizationStatus } from '../../consts';
import {HelmetProvider} from 'react-helmet-async';
import EmptyScreen from '../../pages/empty-screen/empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';

type AppScreenProps = {
  cardsNumber: number;
}

function App({cardsNumber}: AppScreenProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={<MainScreen cardsNumber={cardsNumber} />}
            />
            <Route
              path={AppRoute.Login}
              element={<LoginScreen />}
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus = {AuthorizationStatus.Auth}>
                  <FavoritesScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferScreen />}
            />
            <Route
              path="*"
              element={<EmptyScreen />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
