import { Helmet } from 'react-helmet-async';
import FavoritesCard from '../../components/favorites-card/favorites-card';
import { groupOffersByCity } from '../../helpers';
import { TOffer } from '../../types/offers';

type FavoritesScreenProps = {
  offers: TOffer[];
}

function FavoritesScreen ({offers}: FavoritesScreenProps): JSX.Element {
  const offersByCities = groupOffersByCity(offers);

  return (
    <>
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {offersByCities.length && (
                offersByCities.map(({city, offers: currentOffers})=>(
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {currentOffers.length && (
                        currentOffers.map((co) => <FavoritesCard key={co.id} offer={co}/>)
                      ) }
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default FavoritesScreen;
