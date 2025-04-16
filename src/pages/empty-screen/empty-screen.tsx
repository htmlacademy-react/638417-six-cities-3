import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

function EmptyScreen (): JSX.Element {
  return (
    <div style={{textAlign: 'center'}}>
      <h2>404 Not Found</h2>
      <Link to={AppRoute.Root} style={{textDecoration: 'underline'}}>Home</Link>
    </div>
  );
}

export default EmptyScreen;
