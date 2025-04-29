import { AppRoute } from '../../consts';
import {HelmetProvider} from 'react-helmet-async';
import EmptyScreen from '../../pages/empty-screen/empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { getAuthorizationStatus } from '../../helpers';
import { TOffer } from '../../types/offers';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

type AppScreenProps = {
  cardsNumber: number;
  offers: TOffer[];
}

function App({offers, cardsNumber}: AppScreenProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Layout />}
          >
            <Route
              index
              element={<MainScreen offers={offers} cardsNumber={cardsNumber} />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus = {authorizationStatus} isReverse>
                  <LoginScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus = {authorizationStatus}>
                  <FavoritesScreen offers={offers}/>
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferScreen offers={offers}/>}
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
