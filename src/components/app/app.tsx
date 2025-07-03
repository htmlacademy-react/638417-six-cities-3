import { AppRoute } from '../../consts';
import { HelmetProvider } from 'react-helmet-async';
import EmptyScreen from '../../pages/empty-screen/empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { TReviews } from '../../types/reviews';
import { useAppDispatch, useAppSelector } from '../../hooks';

import useInitCity from '../../hooks/use-init-city';
import { useEffect } from 'react';
import { fetchAllOffers } from '../../store/thunks/offers';

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorToastHandler from '../toast/toast';
import { checkAuth } from '../../store/thunks/user';

type AppScreenProps = {
  reviews: TReviews[];
}

function App({ reviews }: AppScreenProps): JSX.Element {

  const offers = useAppSelector((state) => state.offers.offers);

  const dispatch = useAppDispatch();

  useInitCity();

  useEffect(()=>{
    dispatch(checkAuth());
    dispatch(fetchAllOffers());
  },[dispatch]);


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
                <PrivateRoute isReverse>
                  <LoginScreen />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute >
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
        <ToastContainer />
        <ErrorToastHandler />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
