import { AFTER_INIT_CITY, AppRoute } from '../../consts';
import { HelmetProvider } from 'react-helmet-async';
import EmptyScreen from '../../pages/empty-screen/empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { getAuthorizationStatus } from '../../helpers';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { TReviews } from '../../types/reviews';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/actions';

type AppScreenProps = {
  reviews: TReviews[];
}

function App({ reviews }: AppScreenProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();

  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  dispatch(setCity(AFTER_INIT_CITY));

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
              element={<MainScreen />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                  <LoginScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesScreen offers={offers} />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferScreen offers={offers} reviews={reviews} />}
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
