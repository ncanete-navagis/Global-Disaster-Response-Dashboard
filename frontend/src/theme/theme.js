import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a1a24', // Dark color from the design (e.g., text)
    },
    secondary: {
      main: '#e5e7eb', // Light gray background cards
    },
    background: {
      default: '#f3f4f6', // Light gray background of the app
      paper: '#ffffff', // White card backgrounds
    },
    success: {
      main: '#10b981', // Green for positive stats
    },
    warning: {
      main: '#f59e0b', // Yellow/Orange
    },
    error: {
      main: '#ef4444', // Red for alerts
    },
    info: {
      main: '#3b82f6', // Blue
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.875rem', // Slightly smaller text typical for dashboards
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
