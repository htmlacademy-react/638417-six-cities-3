import { TOffer } from '../../types/offers';
import Card from '../card/card';

type CardListProps = {
  cardsNumber: number;
  offers: TOffer[];
}

function CardList({cardsNumber, offers}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{cardsNumber} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
        Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom">
            <li
              className="places__option places__option--active"
              tabIndex={0}
            >
          Popular
            </li>
            <li className="places__option" tabIndex={0}>
          Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
          Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
          Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.length
            ? (
              offers.map((o)=><Card key={o.id} offer={o} />)
            )
            : 'No data'}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>
  );
}

export default CardList;
