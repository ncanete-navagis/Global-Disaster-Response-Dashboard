# Product Design: Google Maps React Application for Earthquake Tracking

## Overview
This document outlines the technical design for a React-based application that utilizes the Google Maps API to visualize earthquake events. The application will fetch earthquake data and plot markers on the map, providing users with interactive insights into recent seismic activity.

## Architecture & Security

To ensure the security of our Google Maps API credentials and prevent unauthorized usage, the architecture will rely on a decoupled frontend and a secure backend proxy server.

### Secure Backend Proxy Plan
1. **API Key Restrictions**: For the Maps JavaScript API itself, the API key must be sent to the client. This will be secured using **HTTP referrers restrictions** in the Google Cloud Console to ensure the key can only be used from our authorized web domains.
2. **Backend Proxy for Data Services**: For any supplementary Google APIs (like Geocoding, Places API, etc.) or external Earthquake data sources, the React frontend will NOT communicate directly with these services. Instead, it will make requests to our custom backend API.
3. **Environment Storage**: Sensitive credentials and server-side API keys will be strictly maintained in server-side environment variables (`.env`) and will never be exposed to the browser or committed to version control.
4. **Endpoint Protection**: The backend proxy will implement CORS (Cross-Origin Resource Sharing) configured strictly to our frontend origins, and rate-limiting to prevent abuse or DDoS attacks that could rack up API billing charges.

## Data Models

### Earthquake Marker Data Structure
The state of our earthquake markers on the map will be governed by a structured and typed data model to encapsulate the required metrics: magnitude, depth, and timestamp.

```typescript
interface EarthquakeEvent {
  id: string;                 // Unique identifier for the earthquake event
  location: {                 // Geographical coordinates for the map marker
    lat: number;              // Latitude
    lng: number;              // Longitude
  };
  magnitude: number;          // Seismic magnitude
  depthKm: number;            // Depth of the earthquake in kilometers
  timestamp: string;          // ISO 8601 formatted date-time string (e.g. UTC)
  placeName?: string;         // Optional human-readable location description
}

// Example Data Point:
const exampleEvent: EarthquakeEvent = {
  id: "us6000jllv",
  location: { 
    lat: 38.8093333, 
    lng: -122.8231659 
  },
  magnitude: 4.2,
  depthKm: 12.5,
  timestamp: "2026-03-16T17:46:09Z",
  placeName: "7km NW of The Geysers, CA"
};
```

## Frontend Technologies
- **Framework**: React.js (via Vite or Next.js)
- **Map Library**: `@vis.gl/react-google-maps` (Official React wrapper by Google) or `google-map-react`.
- **State Management**: React Context or Zustand for handling global map state and loaded earthquake datasets.
- **Data Fetching**: React Query or standard fetch API for communicating with our secure backend proxy.
