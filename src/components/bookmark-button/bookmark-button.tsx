import { memo } from 'react';
import { BookmarkButtonPlace } from '../../consts';

type BookmarkButtonProps = {
  place: BookmarkButtonPlace;
  isFavorite: boolean;
  id: string;
};

function BookmarkButton({ place, isFavorite, id }: BookmarkButtonProps): JSX.Element {
  const handleClickFavorite = () => {
    console.log(id);
  };

  const isCard = place === BookmarkButtonPlace.Card;

  const buttonClass = isCard
    ? `place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`
    : `offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`;

  const iconClass = isCard ? 'place-card__bookmark-icon' : 'offer__bookmark-icon';
  const iconSize = isCard ? { width: 18, height: 19 } : { width: 31, height: 33 };

  return (
    <button onClick={handleClickFavorite} className={buttonClass} type="button">
      <svg className={iconClass} width={iconSize.width} height={iconSize.height}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

const MemoBookmarkButton = memo(BookmarkButton);
export default MemoBookmarkButton;
