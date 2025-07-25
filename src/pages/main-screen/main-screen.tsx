import { useCallback, useEffect, useMemo, useState } from 'react';
import CardList from '../../components/card-list/card-list';
import { TOffer } from '../../types/offers';
import { groupOffersByCity } from '../../helpers';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortType } from '../../consts';
import { setCity } from '../../store/slices/filter';
import Locations from '../../components/locations/locations';
import { selectOffers } from '../../store/selectors/offers';
import { selectCity, selectSort } from '../../store/selectors/filter';


function MainScreen(): JSX.Element {
  const [curentOffers, setCurentOffers] = useState<TOffer[]>([]);

  const offers = useAppSelector(selectOffers);

  const curentCity = useAppSelector(selectCity);
  const curentSort = useAppSelector(selectSort);

  const offersByCities = useMemo(() => groupOffersByCity(offers), [offers]);
  const cityList = useMemo(() => offersByCities.map((c)=>c.city), [offersByCities]) ;

  const dispatch = useAppDispatch();

  const handleCitySelect = useCallback((city: string) => {
    dispatch(setCity(city));
  }, [dispatch]);

  useEffect(() => {
    const cityData = offersByCities.find((o) => o.city === curentCity);

    if (!cityData) {
      setCurentOffers([]);
      return;
    }

    const sortedOffers = [...cityData.offers];

    switch (curentSort) {
      case SortType.PriceLowToHigh:
        sortedOffers.sort((a, b) => a.price - b.price);
        break;
      case SortType.PriceHighToLow:
        sortedOffers.sort((a, b) => b.price - a.price);
        break;
      case SortType.TopRatedFirst:
        sortedOffers.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.Popular:
      default:
        break;
    }

    setCurentOffers(sortedOffers);
  }, [curentCity, offersByCities, curentSort]);

  return (
    <main className={`page__main page__main--index ${curentOffers.length <= 0 && 'page__main--index-empty'}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <Locations cityList={cityList} curentCity={curentCity} handleCitySelect={handleCitySelect}/>
      </div>
      <div className="cities">
        <CardList offers={curentOffers} curentCity={curentCity} />
      </div>
    </main>
  );
}

export default MainScreen;
