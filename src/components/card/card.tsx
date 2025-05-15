import { Link } from 'react-router-dom';
import { AppRoute, RATING_MAX } from '../../consts';
import { TOffer } from '../../types/offers';

type CardProps = {
  offer: TOffer;
  handleHover: (offer?: TOffer) => void;
  nearPlaces?: boolean;
}

function Card({offer, handleHover, nearPlaces}: CardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type, id, isFavorite} = offer;

  const handleMouseEnter = () => {
    handleHover(offer);
  };

  const handleMouseLeave = () => {
    handleHover();
  };

  return (
    <article
      className={`place-card ${nearPlaces ? 'near-places__card' : 'cities__card' }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`${AppRoute.Offer}/${id}`}>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}

        <div
          className={`place-card__image-wrapper ${nearPlaces ? 'near-places__image-wrapper' : 'cities__image-wrapper' }`}
        >

          <img
            className="place-card__image"
            src={previewImage}
            width={260}
            height={200}
            alt="Place image"
          />

        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{`€${price}`}</b>
              <span className="place-card__price-text">/&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
              type="button"
            >
              <svg
                className="place-card__bookmark-icon"
                width={18}
                height={19}
              >
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${100 / RATING_MAX * rating}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">{title}</h2>
          {type && <p className="place-card__type">{type}</p>}
        </div>
      </Link>
    </article>
  );
}
export default Card;
