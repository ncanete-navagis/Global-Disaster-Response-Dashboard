import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEarthquakes } from '../context/EarthquakeContext';
import { formatDistanceToNow } from 'date-fns';

const DashboardCards = () => {
  const { earthquakes, loading } = useEarthquakes();
  const [earthquakesDialogOpen, setEarthquakesDialogOpen] = useState(false);

  return (
    <>
      <Box sx={{ 
        position: 'absolute', 
        bottom: 24, 
        left: { xs: 12, md: 24 }, 
        // Remove `right: 24` so it doesn't stretch 100% width, instead rely on max-width
        zIndex: 10,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        pointerEvents: 'none',
        maxHeight: { xs: '50vh', md: 'none' },
        maxWidth: { xs: 'calc(100vw - 24px)', md: '1200px' }, // Limit width on large screens
        overflowY: { xs: 'auto', md: 'visible' },
        '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar for mobile overlay
      }}>
        
        {/* Earthquakes Card */}
        <Card sx={{ flex: 1, minWidth: { md: '300px' }, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Earthquakes</Typography>
              <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setEarthquakesDialogOpen(true)}>See all</Typography>
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
        <Card sx={{ flex: 1, minWidth: { md: '300px' }, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
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
        <Card sx={{ flex: 1, minWidth: { md: '300px' }, pointerEvents: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
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

      {/* Earthquakes Dialog */}
      <Dialog 
        open={earthquakesDialogOpen} 
        onClose={() => setEarthquakesDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
            sx: { 
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(20px)', 
                border: '1px solid rgba(255, 255, 255, 0.3)', 
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
            All Recent Earthquakes
            <IconButton onClick={() => setEarthquakesDialogOpen(false)} size="small">
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
            ) : (
                <List disablePadding>
                    {earthquakes.map((eq, index) => (
                        <React.Fragment key={eq.id}>
                            <ListItem sx={{ px: 0, py: 2 }}>
                                <ListItemText 
                                    primary={
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                            <Typography variant="subtitle1" fontWeight="bold">{eq.placeName || 'Unknown Location'}</Typography>
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
                                    }
                                    secondary={
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Time: {new Date(eq.timestamp).toLocaleString()} ({formatDistanceToNow(new Date(eq.timestamp), { addSuffix: true })})
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Depth: {eq.depthKm} km
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Coordinates: {eq.location.lat.toFixed(4)}, {eq.location.lng.toFixed(4)}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                            {index < earthquakes.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                    {earthquakes.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>No recent earthquake data available.</Typography>}
                </List>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setEarthquakesDialogOpen(false)} color="inherit">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardCards;
