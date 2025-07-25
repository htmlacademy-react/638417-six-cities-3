import { Link } from 'react-router-dom';
import { AppRoute, BookmarkButtonPlace, RATING_MAX } from '../../consts';
import { TOffer } from '../../types/offers';
import BookmarkButton from '../bookmark-button/bookmark-button';

type FavoritesCardProps = {
  offer: TOffer;
}

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type, id, isFavorite} = offer;

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
            <BookmarkButton place={BookmarkButtonPlace.Card} isFavorite={isFavorite} id={id} />
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
