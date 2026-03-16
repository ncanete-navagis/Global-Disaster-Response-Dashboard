import React from 'react';
import MapComponent from './MapComponent';
import { useEarthquakes } from '../context/EarthquakeContext';
import { Box, CircularProgress } from '@mui/material';

const MapComponentContainer = () => {
    const { earthquakes, loading } = useEarthquakes();

    if (loading && earthquakes.length === 0) {
        return (
            <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f3f4f6' }}>
                <CircularProgress />
            </Box>
        )
    }

    return <MapComponent earthquakes={earthquakes} />;
};

export default MapComponentContainer;
