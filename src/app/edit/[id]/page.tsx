'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogById, updateBlog } from '@/store/slices/blogSlice';
import { BlogFormData } from '@/store/slices/blogSlice';
import Layout from '@/components/Layout/Layout';
import BlogForm from '@/components/Blog/BlogForm';
import { Box, CircularProgress, Alert } from '@mui/material';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const dispatch = useAppDispatch();
  const { selectedBlog, loading, error } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }

    // Cleanup function to clear selected blog when leaving the page
    return () => {
      dispatch({ type: 'blog/clearSelectedBlog' });
    };
  }, [dispatch, id]);

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await dispatch(updateBlog({ 
        id,
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl || '',
        category: data.category,
        isMarkdown: selectedBlog?.isMarkdown || false
      })).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  if (loading && !selectedBlog) {
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

  if (error && !selectedBlog) {
    return (
      <Layout>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Layout>
    );
  }

  if (!selectedBlog) {
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
      <BlogForm
        initialData={{
          title: selectedBlog.title,
          content: selectedBlog.content,
          imageUrl: selectedBlog.imageUrl,
          category: selectedBlog.category,
          isMarkdown: selectedBlog.isMarkdown
        }}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Update Blog"
      />
    </Layout>
  );
} 