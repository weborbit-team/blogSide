'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Vibrant blue
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#10B981', // Fresh green
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#111827', // Deep navy
      paper: '#1F2937', // Lighter navy
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E7EB',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", sans-serif',
    allVariants: {
      color: '#FFFFFF',
    },
    h1: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
      marginBottom: '1.75rem',
    },
    h2: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
      marginBottom: '1.5rem',
    },
    h3: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.875rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
      marginBottom: '1.25rem',
    },
    h4: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.5rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
      marginBottom: '1rem',
    },
    h5: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
      marginBottom: '0.75rem',
    },
    h6: {
      fontFamily: '"Merriweather", "Georgia", serif',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
      marginBottom: '0.75rem',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.8,
      letterSpacing: '0',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0',
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0',
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      letterSpacing: '0',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(31, 41, 55, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          backgroundColor: '#1F2937',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 56,
          borderRadius: 0,
        },
        indicator: {
          height: 3,
          // borderRadius: '3px 3px 0 0',
          backgroundColor: '#3B82F6',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          minHeight: 56,
          borderRadius: 8,
          marginRight: 8,
          color: '#D1D5DB',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            color: '#F9FAFB',
          },
          '&.Mui-selected': {
            color: '#3B82F6',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#1F2937',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B82F6',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#3B82F6',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          fontSize: '0.9rem',
          height: 32,
          '&:hover': {
            backgroundColor: 'rgba(45, 55, 72, 0.08)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;