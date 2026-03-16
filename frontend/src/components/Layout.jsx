import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, position: 'relative' }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
