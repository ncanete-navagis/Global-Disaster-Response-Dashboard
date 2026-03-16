import React from 'react';
import Layout from './components/Layout';
import { Typography, Box } from '@mui/material';
import { EarthquakeProvider } from './context/EarthquakeContext';
import MapComponentContainer from './components/MapComponentContainer';
import DashboardCards from './components/DashboardCards';

function App() {
  return (
    <EarthquakeProvider>
        <Layout>
        <Box sx={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
            <Typography variant="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Hi Niles <span role="img" aria-label="wave">👋</span>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
            Global Disaster Response Dashboard
            </Typography>
        </Box>

        {/* Map Layer */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <MapComponentContainer />
        </Box>

        {/* Floating Cards (Overlay) */}
        <DashboardCards />

        </Layout>
    </EarthquakeProvider>
  );
}

export default App;
