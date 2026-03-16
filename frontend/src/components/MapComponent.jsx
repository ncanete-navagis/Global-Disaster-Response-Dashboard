import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapComponent = ({ earthquakes = [] }) => {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID'; // Required for AdvancedMarker

  if (!API_KEY) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Google Maps API Key completely missing.</div>;
  }

  // Global view center
  const defaultCenter = { lat: 20, lng: 0 };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={MAP_ID}
        defaultCenter={defaultCenter}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        style={{ width: '100%', height: '100%' }}
      >
        {earthquakes.map((eq) => {
          // Determine marker color based on magnitude
          let bgColor = '#10b981'; // Green (default)
          if (eq.magnitude >= 6.0) bgColor = '#ef4444'; // Red
          else if (eq.magnitude >= 4.5) bgColor = '#f59e0b'; // Orange/Yellow

          return (
             <AdvancedMarker 
                key={eq.id} 
                position={{ lat: eq.location.lat, lng: eq.location.lng }}
                title={eq.placeName}
              >
                  <Pin background={bgColor} borderColor={'#1a1a24'} glyphColor={'#fff'} scale={0.8} />
              </AdvancedMarker>
          )
        })}
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
