'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function HomePage() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.05) 0%, transparent 70%)
          `,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.2,
          zIndex: 1,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={6} alignItems="center" textAlign="center">
          {/* Success Badge */}
          <Chip
            icon={<CheckCircleIcon />}
            label="Integration Successful"
            color="success"
            sx={{
              py: 2,
              px: 3,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              backdropFilter: 'blur(8px)',
              '& .MuiChip-label': { 
                fontSize: '1rem',
                color: '#34d399' 
              },
              '& .MuiChip-icon': { 
                fontSize: '1.5rem',
                color: '#34d399'
              },
              border: '1px solid rgba(52, 211, 153, 0.2)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
            }}
          />

          {/* Main Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #60a5fa, #3b82f6, #2563eb)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))',
              mb: 2,
            }}
          >
            Next.js + Material UI
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(226, 232, 240, 0.8)',
              maxWidth: '600px',
              lineHeight: 1.6,
              letterSpacing: '0.01em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Your development environment is ready with the perfect combination of 
            Next.js 14 and Material UI v5
          </Typography>

         {/* Action Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketLaunchIcon />}
              component="a"
              href="https://github.com/vighnesh09/NextJs-Material-UI/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                background: 'linear-gradient(45deg, #3b82f6 30%, #2563eb 90%)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #2563eb 30%, #1d4ed8 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              component="a"
              href="https://github.com/vighnesh09/NextJs-Material-UI/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#e2e8f0',
                borderColor: 'rgba(226, 232, 240, 0.2)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                background: 'rgba(226, 232, 240, 0.03)',
                '&:hover': {
                  borderColor: 'rgba(226, 232, 240, 0.5)',
                  background: 'rgba(226, 232, 240, 0.05)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                }
              }}
            >
              View Source
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
