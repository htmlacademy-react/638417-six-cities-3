import leaflet, { Map as LeafletMap } from 'leaflet';
import { TLocation } from '../types/offers';
import { useEffect, useRef, useState } from 'react';

type UseMapProps = {
  location: TLocation;
  containerRef: React.RefObject<HTMLElement | null>;
}

const TILE_LAYER_PATTERN = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const useMap = ({ location, containerRef }: UseMapProps): LeafletMap | null => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderRef = useRef(false);

  useEffect(() => {
    if (containerRef.current !== null && !isRenderRef.current) {
      const instance = leaflet.map(containerRef.current, {
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
        .addTo(instance);

      setMap(instance);
      isRenderRef.current = true;
    } else if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [location, containerRef, map]);

  return map;
};
