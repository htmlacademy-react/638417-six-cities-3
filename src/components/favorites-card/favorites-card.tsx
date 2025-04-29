import { Link } from 'react-router-dom';
import { AppRoute, RATING_MAX } from '../../consts';
import { TOffer } from '../../types/offers';

type FavoritesCardProps = {
  offer: TOffer;
}

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type, id} = offer;

  return (
    <article className="favorites__card place-card">
      <Link to={`${AppRoute.Offer}/${id}`}>
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="favorites__image-wrapper place-card__image-wrapper">

          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{`€${price}`}</b>
              <span className="place-card__price-text">
                /&nbsp;night
              </span>
            </div>
            <button
              className="place-card__bookmark-button place-card__bookmark-button--active button"
              type="button"
            >
              <svg
                className="place-card__bookmark-icon"
                width={18}
                height={19}
              >
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${100 / RATING_MAX * rating}%` }} />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">{title}</h2>
          <p className="place-card__type">{type}</p>
        </div>
      </Link>
    </article>
  );
}

export default FavoritesCard;
