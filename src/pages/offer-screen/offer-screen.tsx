import { useParams } from 'react-router-dom';
import { RATING_MAX } from '../../consts';
import { TOffer } from '../../types/offers';
import EmptyScreen from '../empty-screen/empty-screen';
import Host from '../../components/host/host';
import { Helmet } from 'react-helmet-async';
import Reviews from '../../components/reviews/reviews';
import { TReviews } from '../../types/reviews';
import MapComponent from '../../components/map-component/map-component';
import { useState } from 'react';
import { Nullable } from 'vitest';
import Card from '../../components/card/card';

type OfferScreenProps = {
  offers: TOffer[];
  reviews: TReviews[];
}

function OfferScreen({ offers, reviews }: OfferScreenProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<TOffer>>(null);

  const { id } = useParams();

  const currentOffer: TOffer | undefined = offers.find((o: TOffer) => o.id === id);
  const currentCity = offers[0]?.city;

  const handleHover = (offer?: TOffer) => {
    setActiveOffer(offer || null);
  };

  if (!currentOffer) {
    return <EmptyScreen type="offer" />;
  }

  const { title, images, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description, isFavorite } = currentOffer;
  const bedroomsTitle = bedrooms > 1 ? 'Bedrooms' : 'Bedroom';
  const adultsTitle = maxAdults > 1 ? 'adults' : 'adult';

  return (
    <>
      <Helmet>
        <title>6 cities.{title}</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.length && (
                images.map((i) => (
                  <div className="offer__image-wrapper" key={i}>
                    <img
                      className="offer__image"
                      src={i}
                      alt="Photo"
                    />
                  </div>
                ))
              )}

            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className={`offer__bookmark-button button ${isFavorite && 'offer__bookmark-button--active'}`} type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${100 / RATING_MAX * rating}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${bedrooms} ${bedroomsTitle}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${maxAdults} ${adultsTitle}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{`€${price}`}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {goods.length && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What`s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((g) => <li key={g} className="offer__inside-item">{g}</li>)}
                  </ul>
                </div>
              )}
              <Host host={host} description={description} />
              <Reviews reviews={reviews} />
            </div>
          </div>
          {offers.length > 0 && <MapComponent className='offer__map' city={currentCity} offers={[offers[0], offers[1], offers[2]]} activeOffer={activeOffer} />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offers.length
                ? (
                  [offers[0], offers[1], offers[2]].map((o)=><Card nearPlaces key={o.id} offer={o} handleHover={handleHover}/>)
                )
                : 'No data'}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default OfferScreen;
