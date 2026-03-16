import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const EarthquakeContext = createContext();

export const useEarthquakes = () => useContext(EarthquakeContext);

export const EarthquakeProvider = ({ children }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real scenario, this would point to our secure backend proxy
  // For this frontend demo, we might hit the USGS API directly if proxy isn't ready
  // Proxy endpoint defined in productdesign.md
  
  const fetchEarthquakes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
        // Mock data matching the EarthquakeEvent interface in productdesign.md
        // Real implementation would be: 
        // const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/earthquakes`);
        // setEarthquakes(response.data);

        // For immediate visual feedback without a backend running yet:
        const mockData = [
            {
                id: "us6000jllv",
                location: { lat: 38.8093333, lng: -122.8231659 },
                magnitude: 4.2,
                depthKm: 12.5,
                timestamp: new Date().toISOString(),
                placeName: "7km NW of The Geysers, CA"
            },
            {
                id: "nc73860550",
                location: { lat: 37.3888333, lng: -121.8211667 },
                magnitude: 3.1,
                depthKm: 6.2,
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                placeName: "10km E of San Jose, CA"
            },
            {
                id: "us7000kw6d",
                location: { lat: -21.1449, lng: -176.6214 },
                magnitude: 6.5,
                depthKm: 215.3,
                timestamp: new Date(Date.now() - 86400000).toISOString(),
                placeName: "115 km WSW of Hihifo, Tonga"
            },
             {
                id: "us6000jlkv",
                location: { lat: 35.8093, lng: 140.8231 },
                magnitude: 5.2,
                depthKm: 42.5,
                timestamp: new Date().toISOString(),
                placeName: "Near East Coast of Honshu, Japan"
            }
        ];
        
        // Simulating network delay
        setTimeout(() => {
             setEarthquakes(mockData);
             setLoading(false);
        }, 800);

    } catch (err) {
        console.error("Failed to fetch earthquakes:", err);
        setError("Failed to load earthquake data.");
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEarthquakes();
  }, [fetchEarthquakes]);

  const value = {
    earthquakes,
    loading,
    error,
    refreshData: fetchEarthquakes
  };

  return (
    <EarthquakeContext.Provider value={value}>
      {children}
    </EarthquakeContext.Provider>
  );
};
