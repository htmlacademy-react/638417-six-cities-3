import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function EmptyScreen (): JSX.Element {
  return (
    <>
      <h2>404 Not Found</h2>
      <Link to={AppRoute.Root}>Home</Link>
    </>
  );
}

export default EmptyScreen;
