'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBlogById, updateBlog } from '@/store/slices/blogSlice';
import Layout from '@/components/Layout/Layout';
import BlogForm from '@/components/Blog/BlogForm';
import { Alert, CircularProgress, Box } from '@mui/material';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const dispatch = useAppDispatch();
  const { selectedBlog: blog, loading, error } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  const handleSubmit = async (data) => {
    try {
      await dispatch(updateBlog({ id, ...data })).unwrap();
      router.push(`/blog/${id}`);
    } catch (error) {
      console.error('Failed to update blog:', error);
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

  if (error) {
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
      <BlogForm
        initialData={{
          title: blog.title,
          content: blog.content,
          imageUrl: blog.imageUrl,
          category: blog.category,
          isMarkdown: blog.isMarkdown,
        }}
        onSubmit={handleSubmit}
        isLoading={loading}
        submitText="Update Blog"
      />
    </Layout>
  );
} 