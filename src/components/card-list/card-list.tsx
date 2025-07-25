import { useCallback, useState } from 'react';
import { TOffer } from '../../types/offers';
import Card from '../card/card';
import { Nullable } from 'vitest';
import MapComponent from '../map-component/map-component';
import Sort from '../sort/sort';
import { useAppSelector } from '../../hooks';
import Spiner from '../spiner/spiner';
import { RequestStatus } from '../../consts';
import { selectOffersStatus } from '../../store/selectors/offers';

type CardListProps = {
  offers: TOffer[];
}

function CardList({ offers }: CardListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<TOffer>>(null);

  const handleHover = useCallback((offer?: TOffer) => {
    setActiveOffer(offer || null);
  }, [setActiveOffer]);


  const status = useAppSelector(selectOffersStatus);

  const currentCity = offers[0]?.city;

  if (status === RequestStatus.Loading || status === RequestStatus.Idle) {
    return <Spiner />;
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity?.name}</b>
        <Sort />
        <div className="cities__places-list places__list tabs__content">
          {offers.length
            ? (
              offers.map((o) => <Card key={o.id} offer={o} handleHover={handleHover} />)
            )
            : 'No data'}
        </div>
      </section>
      <div className="cities__right-section">
        {offers.length > 0 && <MapComponent className='cities__map' city={currentCity} offers={offers} activeOffer={activeOffer} />}
      </div>
    </div>
  );
}

export default CardList;
