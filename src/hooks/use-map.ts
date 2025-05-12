import { useEffect, useRef } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import { TLocation } from '../types/offers';

type UseMapProps = {
  location: TLocation;
  containerRef: React.RefObject<HTMLElement | null>;
};

const TILE_LAYER_PATTERN = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const useMap = ({ location, containerRef }: UseMapProps): LeafletMap | null => {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (containerRef.current !== null && mapRef.current === null) {
      const mapInstance = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(TILE_LAYER_PATTERN, {
          attribution: TILE_LAYER_ATTRIBUTION,
        })
        .addTo(mapInstance);

      mapRef.current = mapInstance;
    }
  }, [containerRef, location]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [location]);

  return mapRef.current;
};
