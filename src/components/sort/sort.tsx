import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { SortType } from '../../consts';
import { setSort } from '../../store/slices/filter';

function Sort(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleSortSelect = (sort: SortType) => {
    setIsOpen(false);
    setActiveSort(sort);
    dispatch(setSort(sort));
  };

  const handleSortOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }

    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="places__sorting" ref={sortRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortOpen}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((sortOption) => (
          <li
            key={sortOption}
            className={`places__option ${activeSort === sortOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortSelect(sortOption)}
          >
            {sortOption}
          </li>
        ))}
      </ul>
    </div>
  );
}

const MemoSort = memo(Sort);
export default MemoSort;
