import "./MapViewer.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngBounds, LatLngExpression, icon } from "leaflet";
import { Hotel } from "../../models";
import { memo, useEffect } from "react";
import Rate from "../Rate/Rate";

const hotelIcon = icon({
  iconUrl: "/icons/hotel-marker.svg",
  iconSize: [30, 30],
  className: "rounded",
});

const highlightedIcon = icon({
  iconUrl: "/icons/selected-hotel-marker.svg",
  iconSize: [30, 30],
});

const MapViewer = memo(
  ({ hotels, selectedHotelId, onMarkerClick }: ComponentProps) => {
    const latLngList: LatLngExpression[] = hotels.map((hotel) => [
      hotel.location.lat,
      hotel.location.long,
    ]);
    return (
      <MapContainer className="h-full w-full rounded-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController latLngList={latLngList} />
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            alt={hotel.name}
            position={[hotel.location.lat, hotel.location.long]}
            icon={selectedHotelId === hotel.id ? highlightedIcon : hotelIcon}
            eventHandlers={{ click: () => onMarkerClick(hotel.id) }}
          >
            <Popup>
              <div className="flex gap-2 items-center justify-between base-font">
                <h2 className="font-bold">{hotel.name}</h2>
                <Rate rate={hotel.stars} />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
);

function MapController({ latLngList }: { latLngList: LatLngExpression[] }) {
  const map = useMap();
  useEffect(() => {
    if (latLngList.length === 1) {
      map.setView(latLngList[0], 15);
    } else if (latLngList.length > 1) {
      const maxBound = new LatLngBounds(latLngList);
      map.fitBounds(maxBound);
    }
  }, [latLngList, map]);
  return null;
}

interface ComponentProps {
  hotels: Hotel[];
  selectedHotelId: number | null;
  onMarkerClick: (id: number) => void;
}

export default MapViewer;
