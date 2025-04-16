import { AppRoute } from '../../consts';
import EmptyScreen from '../../pages/empty-screen/empty-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import OfferScreen from '../../pages/offer-screen/offer-screen';

type AppScreenProps = {
  cardsNumber: number;
}

function App({cardsNumber}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen cardsNumber={cardsNumber} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesScreen />}
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<EmptyScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
