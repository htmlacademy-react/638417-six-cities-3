import { AuthorizationStatus } from '../../consts';
import { useAppSelector } from '../../hooks';
import { TReviews } from '../../types/reviews';
import ReviewCard from '../review-card/review-card';
import ReviewsForm from '../reviews-form/reviews-form';

type ReviewsProps = {
    reviews: TReviews[];
}

function Reviews({reviews}: ReviewsProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.user.authorizationStatus);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.length > 0 && (
          reviews.map((r)=> <ReviewCard key={r.id} review={r} />)
        )}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ? (
        <ReviewsForm />
      ) : null}
    </section>
  );
}


export default Reviews;
