import { Helmet } from 'react-helmet-async';

const ansvers = {
  page: {text: 'Not Found', o: '🤔'},
  offer: {text: 'We have no offers whith that ID', o: '🤒'}
};

type EmptyScreenProps = {
  type?: keyof typeof ansvers;
}

function EmptyScreen ({type = 'page' }: EmptyScreenProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <div style={{textAlign: 'center'}}>
        <h2>Ooops {`4${ansvers[type].o}4`}</h2>
        <h2>{ansvers[type].text}</h2>
      </div>
    </>
  );
}

export default EmptyScreen;
