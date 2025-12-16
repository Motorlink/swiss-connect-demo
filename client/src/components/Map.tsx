import { cn } from "@/lib/utils";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Fix Leaflet default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  className?: string;
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    title?: string;
    content?: React.ReactNode;
    icon?: L.DivIcon | L.Icon;
    onClick?: () => void;
  }>;
  onMapReady?: (map: L.Map) => void;
}

function MapController({ onMapReady }: { onMapReady?: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  return null;
}

export function MapView({
  className,
  center = [46.8182, 8.2275], // Switzerland center
  zoom = 8,
  markers = [],
  onMapReady,
}: MapViewProps) {
  return (
    <div className={cn("w-full h-full relative z-0", className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full rounded-lg"
        style={{ background: "#f1f5f9" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapController onMapReady={onMapReady} />
        
        {markers.map((marker, i) => (
          <Marker 
            key={i} 
            position={marker.position}
            icon={marker.icon || DefaultIcon}
            eventHandlers={{
              click: () => {
                if (marker.onClick) marker.onClick();
              }
            }}
          >
            {marker.title && (
              <Popup>
                <div className="font-sans text-sm">
                  <strong>{marker.title}</strong>
                  {marker.content && <div className="mt-1">{marker.content}</div>}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
