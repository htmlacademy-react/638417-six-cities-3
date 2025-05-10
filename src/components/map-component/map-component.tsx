import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../consts';
import { TCity, TOffer } from '../../types/offers';
import { useMap } from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  city: TCity;
  offers: TOffer[];
  activeOffer?: TOffer | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComponent({ city, offers, activeOffer }: MapComponentProps): JSX.Element {
  const mapContainerRef = useRef(null);
  const map = useMap({ location: city.location, containerRef: mapContainerRef });

  useEffect(() =>{
    if (map) {
      offers.forEach((o)=>{
        leaflet
          .marker({
            lat: o.location.latitude,
            lng: o.location.longitude,
          }, {
            icon: o.title === activeOffer?.title ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }

  },[map, offers, activeOffer]);

  return <section className="cities__map map" ref={mapContainerRef}/>;
}

export default MapComponent;
