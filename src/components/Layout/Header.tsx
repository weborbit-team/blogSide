'use client';

import { AppBar, Toolbar, Button, Box, Typography, Container } from '@mui/material';
import { Add as AddIcon, Create as CreateIcon } from '@mui/icons-material';
import Link from 'next/link';

const Header = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: 72,
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                '&:hover': {
                  '& .logo-icon': {
                    transform: 'rotate(-5deg)',
                  },
                  '& .logo-text': {
                    color: '#60A5FA',
                  },
                },
              }}
            >
              <CreateIcon 
                className="logo-icon"
                sx={{ 
                  fontSize: 32,
                  color: '#3B82F6',
                  transition: 'transform 0.2s ease-in-out',
                }} 
              />
              <Typography 
                className="logo-text"
                variant="h5" 
                sx={{ 
                  fontWeight: 800,
                  color: '#F9FAFB',
                  letterSpacing: '-0.5px',
                  transition: 'color 0.2s ease-in-out',
                }}
              >
                MyBlog
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button 
                sx={{ 
                  color: '#D1D5DB',
                  fontWeight: 600,
                  px: 3,
                  height: 44,
                  borderRadius: 8,
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: '#F9FAFB',
                  }
                }}
              >
                Home
              </Button>
            </Link>

            <Link href="/create" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: '#3B82F6',
                  color: 'white',
                  fontWeight: 600,
                  px: 3,
                  height: 44,
                  borderRadius: 8,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2563EB',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Write
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 