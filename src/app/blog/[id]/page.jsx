'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogById, deleteBlog } from '@/store/slices/blogSlice';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Container,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon,
  Category as CategoryIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown-light.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000&auto=format&fit=crop';

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const dispatch = useAppDispatch();
  const { selectedBlog: blog, loading, error } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    // Cleanup function to clear selected blog when leaving the page
    return () => {
      dispatch({ type: 'blog/clearSelectedBlog' });
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await dispatch(deleteBlog(id)).unwrap();
        router.push('/');
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  if (loading && !blog) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress size={60} />
        </Box>
      </Layout>
    );
  }

  if (error && !blog) {
    return (
      <Layout>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <Alert severity="warning">
          Blog not found
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <MuiLink
            component={Link}
            href="/"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </MuiLink>
          <Typography color="text.primary">Blog Post</Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 4 }}
          variant="outlined"
        >
          Back to Posts
        </Button>

        <Paper elevation={0} sx={{ p: 0, borderRadius: 3, overflow: 'hidden' }}>
          {/* Hero Image */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '300px', md: '500px' },
              overflow: 'hidden',
              mb: 4,
            }}
          >
            <Box
              component="img"
              src={blog.imageUrl || DEFAULT_IMAGE}
              alt={blog.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                pt: 8,
                pb: 4,
                px: { xs: 2, md: 4 },
              }}
            >
              <Container maxWidth="lg">
                <Chip
                  label={blog.category}
                  color="primary"
                  sx={{ mb: 2, backgroundColor: 'white', color: 'primary.main' }}
                />
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' },
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  {blog.title}
                </Typography>
              </Container>
            </Box>
          </Box>

          <Box sx={{ p: { xs: 3, md: 6 } }}>
            {/* Metadata */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                mb: 4,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimeIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(blog.createdAt)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CategoryIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {blog.category}
                </Typography>
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ mb: 4 }}>
              {blog.isMarkdown ? (
                <Box className="markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blog.content}
                  </ReactMarkdown>
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.primary',
                  }}
                >
                  {blog.content}
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => router.push(`/edit/${blog._id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
} 