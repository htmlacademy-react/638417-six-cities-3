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
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MapComponent({ city, offers, activeOffer }: MapComponentProps): JSX.Element {
  const mapContainerRef = useRef(null);
  const map = useMap({ location: city.location, containerRef: mapContainerRef });
  const markersRef = useRef<leaflet.Marker[]>([]);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker) => {
        map.removeLayer(marker);
      });
      markersRef.current = [];

      offers.forEach((offer) => {
        const marker = leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: offer.id === activeOffer?.id ? currentCustomIcon : defaultCustomIcon,
          }
        ).addTo(map);

        markersRef.current.push(marker);
      });
    }
  }, [map, offers, activeOffer]);

  return <section className="cities__map map" ref={mapContainerRef} />;
}

export default MapComponent;
