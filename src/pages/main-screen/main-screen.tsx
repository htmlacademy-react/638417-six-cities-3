import { useEffect, useMemo, useState } from 'react';
import CardList from '../../components/card-list/card-list';
import { TOffer } from '../../types/offers';
import { groupOffersByCity } from '../../helpers';

type MainScreenProps = {
  offers: TOffer[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [curentCity, setCurentCity] = useState('Amsterdam');
  const [curentOffers, setCurentOffers] = useState<TOffer[]>([]);

  const offersByCities = useMemo(() => groupOffersByCity(offers), [offers]);
  const cityList = offersByCities.map((c)=>c.city);

  const handleCitySelect = (city: string) => {
    setCurentCity(city);
  };


  useEffect(() => {
    const cityData = offersByCities.find((o) => o.city === curentCity);
    setCurentOffers(cityData ? cityData.offers : []);
  }, [curentCity, offersByCities]);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityList.length > 0 && cityList.map((c)=> (
              <li key={c} className="locations__item" onClick={()=>handleCitySelect(c)}>
                <a className={`locations__item-link tabs__item ${c === curentCity ? 'tabs__item--active' : ''}`}>
                  <span>{c}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="cities">
        <CardList offers={curentOffers}/>
      </div>
    </main>
  );
}

export default MainScreen;
