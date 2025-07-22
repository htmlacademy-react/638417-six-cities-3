import React, { FormEvent, memo, ReactEventHandler, useState } from 'react';
import { RATINGS } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { postOfferComments } from '../../store/thunks/comments';
import { useParams } from 'react-router-dom';

type THandleChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>
type THandleSubmith= FormEvent<HTMLFormElement>

function ReviewsForm():JSX.Element {
  const [currentReview, setReview] = useState({rating: 0, comment: ''});
  const {rating, comment} = currentReview;

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const handleChange: THandleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    setReview((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmith = (evt: THandleSubmith) => {
    evt.preventDefault();
    dispatch(postOfferComments({ body: currentReview, id: id as string }));
  };
  return (
    <form className="reviews__form form" onSubmit={handleSubmith} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
      Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
        your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={rating === 0 || comment.length < 50}
        >
        Submit
        </button>
      </div>
    </form>
  );
}

const MemoForm = memo(ReviewsForm);
export default MemoForm;
