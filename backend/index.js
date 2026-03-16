require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy if we are behind a reverse proxy (e.g. Heroku, AWS ELB, Nginx)
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// CORS configuration - only allow requests from the frontend url
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Rate limiting configuration
// 100 requests per 15 minutes per IP
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

const limiter = rateLimit({
  windowMs: windowMs,
  max: maxRequests,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to all /api routes
app.use('/api', limiter);

// Endpoints

/**
 * GET /api/earthquakes
 * Fetches earthquake data from the USGS API and maps it to our expected frontend format.
 */
app.get('/api/earthquakes', async (req, res) => {
  try {
    // We are using the "All Earthquakes, Past Day" feed from USGS
    // Full list of feeds: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
    const usgsUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
    
    const response = await axios.get(usgsUrl);
    const data = response.data;
    
    if (!data || !data.features) {
      return res.status(500).json({ error: 'Invalid data format received from USGS' });
    }

    // Map the GeoJSON features into the structured EarthquakeEvent format
    const events = data.features.map(feature => {
      // The id in our interface
      const id = feature.id;
      
      // Feature geometry coordinates: [longitude, latitude, depth]
      const [lng, lat, depth] = feature.geometry.coordinates;
      
      const properties = feature.properties;
      const magnitude = properties.mag;
      const timestamp = new Date(properties.time).toISOString();
      const placeName = properties.place;

      return {
        id,
        location: { lat, lng },
        magnitude,
        depthKm: depth,
        timestamp,
        placeName
      };
    });

    res.json({
      metadata: data.metadata,
      events: events
    });
  } catch (error) {
    console.error('Error fetching earthquake data:', error.message);
    res.status(500).json({ error: 'Failed to fetch earthquake data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend proxy server running on port ${PORT}`);
  console.log(`Allowed CORS origin: ${corsOptions.origin}`);
});
