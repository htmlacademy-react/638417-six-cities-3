import { memo } from 'react';

type LocationsProps = {
  cityList: string[];
  curentCity: string;
  handleCitySelect: (city: string) => void;
};

function Locations({cityList, curentCity, handleCitySelect}: LocationsProps): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityList.length > 0 && cityList.map((c)=> (
          <li key={c} className="locations__item" onClick={() => handleCitySelect(c)}>
            <a className={`locations__item-link tabs__item ${c === curentCity ? 'tabs__item--active' : ''}`}>
              <span>{c}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MemoLocations = memo(Locations);
export default MemoLocations;
