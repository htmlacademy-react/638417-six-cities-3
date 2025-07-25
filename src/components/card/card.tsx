import './card.css';
import { Link } from 'react-router-dom';
import { AppRoute, BookmarkButtonPlace, RATING_MAX } from '../../consts';
import { TOffer } from '../../types/offers';
import { memo } from 'react';
import BookmarkButton from '../bookmark-button/bookmark-button';

type CardProps = {
  offer: TOffer;
  handleHover: (offer?: TOffer) => void;
  nearPlaces?: boolean;
}

function Card({ offer, handleHover, nearPlaces }: CardProps): JSX.Element {
  const { isPremium, previewImage, price, rating, title, type, id, isFavorite } = offer;

  const handleMouseEnter = () => {
    handleHover(offer);
  };

  const handleMouseLeave = () => {
    handleHover();
  };

  return (
    <article
      className={`place-card ${nearPlaces ? 'near-places__card' : 'cities__card'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div
        className={`place-card__image-wrapper ${nearPlaces ? 'near-places__image-wrapper' : 'cities__image-wrapper'}`}
      >
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>

      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${price}`}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton place={BookmarkButtonPlace.Card} isFavorite={isFavorite} id={id} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${100 / RATING_MAX * rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <h2 className="place-card__name">{title}</h2>
        </Link>
        {type && <p className="place-card__type">{type}</p>}
      </div>

    </article>
  );
}

const MemoCard = memo(Card);
export default MemoCard;
