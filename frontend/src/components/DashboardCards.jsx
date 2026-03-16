import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, LinearProgress } from '@mui/material';
import { useEarthquakes } from '../context/EarthquakeContext';
import { formatDistanceToNow } from 'date-fns';

const DashboardCards = () => {
  const { earthquakes, loading } = useEarthquakes();

  return (
      <Box sx={{ 
        position: 'absolute', 
        bottom: 24, 
        left: { xs: 12, md: 24 }, 
        right: { xs: 12, md: 24 }, 
        zIndex: 10,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        pointerEvents: 'none',
        maxHeight: { xs: '50vh', md: 'none' },
        overflowY: { xs: 'auto', md: 'visible' },
        '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar for mobile overlay
      }}>
        
        {/* Earthquakes Card */}
        <Card sx={{ flex: 1, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Earthquakes</Typography>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>See all</Typography>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}><CircularProgress size={24} /></Box>
            ) : (
                <Box>
                    {earthquakes.slice(0, 3).map((eq) => (
                        <Box key={eq.id} sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <Typography variant="body2" fontWeight="bold">{eq.placeName || 'Unknown Location'}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {formatDistanceToNow(new Date(eq.timestamp), { addSuffix: true })}
                                </Typography>
                            </Box>
                            <Box sx={{ 
                                bgcolor: eq.magnitude >= 5 ? 'error.main' : eq.magnitude >= 4 ? 'warning.main' : 'success.main', 
                                color: 'white', 
                                px: 1, 
                                py: 0.5, 
                                borderRadius: 1 
                            }}>
                                <Typography variant="caption" fontWeight="bold">M {eq.magnitude.toFixed(1)}</Typography>
                            </Box>
                        </Box>
                    ))}
                    {earthquakes.length === 0 && <Typography variant="body2" color="text.secondary">No recent data.</Typography>}
                </Box>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                Active global seismic events over magnitude 3.0.
            </Typography>
          </CardContent>
        </Card>

        {/* Safeguards Card */}
        <Card sx={{ flex: 1, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Safeguards</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, position: 'relative', height: 100 }}>
                 <CircularProgress variant="determinate" value={67} size={80} thickness={5} sx={{ color: 'success.main' }} />
                 <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Typography variant="h6" component="div" color="text.primary" fontWeight="bold">
                        67%
                     </Typography>
                     <Typography variant="caption" color="text.secondary">Protected</Typography>
                 </Box>
            </Box>
            
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                Coverage of priority regions under active monitoring.
            </Typography>
          </CardContent>
        </Card>

        {/* Policy Watches Card */}
        <Card sx={{ flex: 1, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Policy Watches</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Box sx={{ flex: 1, bgcolor: 'info.main', color: 'white', p: 1.5, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption">Renewals</Typography>
                    <Typography variant="h5" fontWeight="bold">18</Typography>
                </Box>
                 <Box sx={{ flex: 1, bgcolor: 'success.main', color: 'white', p: 1.5, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption">Reports</Typography>
                    <Typography variant="h5" fontWeight="bold">4</Typography>
                </Box>
                 <Box sx={{ flex: 1, border: '1px solid #e0e0e0', p: 1.5, borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Of note</Typography>
                    <Typography variant="h5" fontWeight="bold">12</Typography>
                </Box>
            </Box>

             <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Active regional emergency response policies.
            </Typography>
          </CardContent>
        </Card>

      </Box>
  );
};

export default DashboardCards;
