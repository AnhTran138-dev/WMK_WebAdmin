import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PlaceDetail } from "@/models/responses/place_detail_map";
import axios from "axios";
import { env } from "@/lib";
import { GeoJsonObject } from "geojson";
import { LatLngTuple, Icon } from "leaflet";

interface MapProps {
  id?: string;
}

const customIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <path d="M12 2a6 6 0 0 1 6 6c0 4.418-6 12-6 12S6 12.418 6 8a6 6 0 0 1 6-6zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#ff0000"/> 
      <circle cx="12" cy="10" r="2" fill="#8b0000"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map: React.FC<MapProps> = ({ id }) => {
  const [placeDetail, setPlaceDetail] = useState<PlaceDetail | null>(null);
  const [center, setCenter] = useState<LatLngTuple>([10.8231, 106.6297]);
  const [geometry, setGeometry] = useState<GeoJsonObject | null>(null);
  const [zoom, setZoom] = useState<number>(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const getPlaceDetails = async () => {
      try {
        const response = await axios.get<PlaceDetail>(
          "https://api.geoapify.com/v2/place-details",
          {
            params: {
              id,
              features: "details,details.names",
              apiKey: env.VITE_API_KEY_GOOGLE_MAPS,
            },
          }
        );
        setPlaceDetail(response.data);

        if (response.data.features[0].geometry) {
          setCenter([
            response.data.features[0].properties.lat,
            response.data.features[0].properties.lon,
          ]);
          setZoom(13);
          setGeometry(response.data.features[0].geometry as GeoJsonObject);
        }
      } catch (error) {
        console.error("Failed to fetch place details", error);
      } finally {
        setLoading(false);
      }
    };

    getPlaceDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      key={JSON.stringify(center)}
      center={center}
      zoom={zoom}
      className="size-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {geometry && (
        <div>
          <GeoJSON
            key={JSON.stringify(geometry)}
            data={geometry}
            style={() => ({
              color: "#11111",
              weight: 5,
              opacity: 0.65,
            })}
          />
          <Marker position={center} icon={customIcon}>
            <Popup>
              <div>
                {placeDetail ? (
                  <>
                    <h2>{placeDetail.features[0].properties.name}</h2>
                    <p>
                      {placeDetail.features[0].properties.address_line1},{" "}
                      {placeDetail.features[0].properties.city},{" "}
                      {placeDetail.features[0].properties.country}
                    </p>
                    <p>
                      Coordinates: {placeDetail.features[0].properties.lat},{" "}
                      {placeDetail.features[0].properties.lon}
                    </p>
                  </>
                ) : (
                  <div>No place details available</div>
                )}
              </div>
            </Popup>
          </Marker>
        </div>
      )}
    </MapContainer>
  );
};

export default Map;
