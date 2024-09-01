// IsolineMap.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { env } from "@/lib";

interface GeoJSONData {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: any[];
}

interface IsolineMapProps {
  lat?: number;
  lon?: number;
  zoom?: number;
  title?: string;
  range?: number;
}

// lat = 10.8768,
// lon = 106.5967,
const IsolineMap: React.FC<IsolineMapProps> = ({
  range = 500,
  lat = 10.8231,
  lon = 106.6297,
  zoom = 12,
}) => {
  const [isolineData, setIsolineData] = useState<GeoJSONData | null>(null);
  const API_KEY = env.VITE_API_KEY_GOOGLE_MAPS;

  useEffect(() => {
    const fetchIsolineData = async () => {
      const url = `https://api.geoapify.com/v1/isoline?lat=${lat}&lon=${lon}&type=time&mode=drive&range=${range}&apiKey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data: GeoJSONData = await response.json();
        setIsolineData(data);
      } catch (error) {
        console.error("Error fetching isoline data:", error);
      }
    };

    fetchIsolineData();
  }, [lat, lon, API_KEY, range]);

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={zoom}
      className="size-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {isolineData && (
        <GeoJSON
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={isolineData as any}
          style={() => ({
            color: "#11111",
            weight: 5,
            opacity: 0.65,
          })}
        />
      )}
      <Marker position={[lat, lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default IsolineMap;
