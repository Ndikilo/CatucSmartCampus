import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Default theme settings
const defaultTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
};

// Create context
const ThemeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
  setPrimaryColor: () => {},
  setSecondaryColor: () => {},
  setTheme: () => {},
  resetTheme: () => {},
});

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [primaryColor, setPrimaryColor] = useState(defaultTheme.palette.primary.main);
  const [secondaryColor, setSecondaryColor] = useState(defaultTheme.palette.secondary.main);
  const [customTheme, setCustomTheme] = useState(null);

  // Load saved theme from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') || 'light';
    const savedPrimary = localStorage.getItem('primaryColor') || defaultTheme.palette.primary.main;
    const savedSecondary = localStorage.getItem('secondaryColor') || defaultTheme.palette.secondary.main;
    
    setMode(savedMode);
    setPrimaryColor(savedPrimary);
    setSecondaryColor(savedSecondary);
  }, []);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Update primary color
  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
  };

  // Update secondary color
  const updateSecondaryColor = (color) => {
    setSecondaryColor(color);
    localStorage.setItem('secondaryColor', color);
  };

  // Apply custom theme
  const applyCustomTheme = (themeConfig) => {
    setCustomTheme(themeConfig);
  };

  // Reset to default theme
  const resetTheme = () => {
    setMode('light');
    setPrimaryColor(defaultTheme.palette.primary.main);
    setSecondaryColor(defaultTheme.palette.secondary.main);
    setCustomTheme(null);
    localStorage.removeItem('themeMode');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');
  };

  // Create theme based on current settings
  const theme = useMemo(() => {
    if (customTheme) {
      return createTheme(customTheme);
    }

    return createTheme({
      ...defaultTheme,
      palette: {
        ...defaultTheme.palette,
        mode,
        primary: {
          ...defaultTheme.palette.primary,
          main: primaryColor,
        },
        secondary: {
          ...defaultTheme.palette.secondary,
          main: secondaryColor,
        },
        background: {
          ...defaultTheme.palette.background,
          ...(mode === 'dark' 
            ? {
                default: '#121212',
                paper: '#1e1e1e',
              } 
            : {
                default: '#f5f5f5',
                paper: '#ffffff',
              }
          ),
        },
      },
    });
  }, [mode, primaryColor, secondaryColor, customTheme]);

  const contextValue = {
    mode,
    toggleColorMode,
    setPrimaryColor: updatePrimaryColor,
    setSecondaryColor: updateSecondaryColor,
    setTheme: applyCustomTheme,
    resetTheme,
    theme, // Expose the theme object for direct access if needed
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
