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
  curentCity: string;
};

function CardList({ offers, curentCity }: CardListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<TOffer>>(null);

  const handleHover = useCallback((offer?: TOffer) => {
    setActiveOffer(offer || null);
  }, []);

  const status = useAppSelector(selectOffersStatus);

  if (status === RequestStatus.Loading || status === RequestStatus.Idle) {
    return <Spiner />;
  }

  if (offers.length === 0) {
    return (
      <div className="cities__places-container container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property available at the moment in {curentCity}
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    );
  }

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {curentCity}
        </b>
        <Sort />
        <div className="cities__places-list places__list tabs__content">
          {offers.map((o) => (
            <Card key={o.id} offer={o} handleHover={handleHover} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <MapComponent className="cities__map" offers={offers} activeOffer={activeOffer} />
      </div>
    </div>
  );
}

export default CardList;
