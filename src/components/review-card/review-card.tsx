import { memo } from 'react';
import { DATE_LOCATION, RATING_MAX } from '../../consts';
import { formatDateForTimeTag } from '../../helpers';
import { TReview } from '../../types/reviews';

type ReviewsProps = {
  review: TReview;
}

function ReviewCard({ review }: ReviewsProps): JSX.Element {
  const {dateTime, dateTextContent} = formatDateForTimeTag(review.date, DATE_LOCATION);

  return (

    <li className="reviews__item">
      <div className="reviews__user user" style={{minWidth: 'fit-content'}}>
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl || 'img/avatar.svg'}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${100 / RATING_MAX * review.rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>
          {dateTextContent}
        </time>
      </div>
    </li>
  );
}

const MemoReviewCard = memo(ReviewCard);
export default MemoReviewCard;
