'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Tabs,
  Tab,
  Pagination,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogs } from '@/store/slices/blogSlice';
import Layout from '@/components/Layout/Layout';
import BlogCard from '@/components/Blog/BlogCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { blogs, loading, error, pagination, tags } = useAppSelector((state) => state.blog);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params: { category?: string; page: number; limit: number } = {
      page,
      limit: 10,
    };
    
    if (selectedCategory) {
      params.category = selectedCategory;
    }
    
    dispatch(fetchBlogs(params));
  }, [dispatch, selectedCategory, page]);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && blogs.length === 0) {
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

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: '#fff',
              mb: 2,
            }}
          >
            Latest Posts
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#666',
              fontWeight: 400,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover the latest stories and insights from our community
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              borderRadius: 0,
            }}
          >
            {error}
          </Alert>
        )}

        {/* Category Tabs */}
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4, 
            borderBottom: 1, 
            borderColor: 'divider',
            backgroundColor: 'transparent',
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="primary"
            // indicatorColor="primary"
            sx={{
              minHeight: 48,
              '& .MuiTabs-indicator': {
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 48,
                color: '#666',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
                '&:hover': {
                  color: 'primary.main',
                  opacity: 1,
                },
              },
            }}
          >
            <Tab 
              label="All Posts" 
              value=""
              sx={{
                mr: 2,
              }}
            />
            {tags.map((tag) => (
              <Tab
                key={tag}
                label={tag}
                value={tag}
                sx={{
                  mr: 2,
                }}
              />
            ))}
          </Tabs>
        </Paper>

        {/* Blog List */}
        <Box sx={{ mb: 6 }}>
          {blogs.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 8, color: '#666' }}>
              No blogs found in this category.
            </Typography>
          ) : (
            blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          )}
        </Box>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 6 }}>
            <Pagination
              count={pagination.pages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 0,
                  fontSize: '1rem',
                  color: '#666',
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Layout>
  );
}