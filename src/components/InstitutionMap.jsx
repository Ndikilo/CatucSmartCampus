import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Create a custom icon for the marker
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: #1976d2;
        border-radius: 50% 50% 50% 0;
        position: relative;
        transform: rotate(-45deg);
        margin: -15px 0 0 -15px;
      ">
        <div style="
          width: 24px;
          height: 24px;
          margin: 3px 0 0 3px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
};

// Set default icon for all markers
if (typeof window !== 'undefined') {
  L.Marker.prototype.options.icon = createCustomIcon();
}

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const InstitutionMap = ({ institution, height = '300px', zoom = 13 }) => {
  const position = institution ? [institution.lat, institution.lng] : [6.0667, 10.2667]; // Default to Bamenda
  
  return (
    <div style={{ height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer 
        center={position} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {institution && !institution.isGuest && (
          <Marker position={position}>
            <Popup>
              <strong>{institution.name}</strong><br />
              {institution.location}
            </Popup>
          </Marker>
        )}
        <MapUpdater center={position} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default InstitutionMap;
