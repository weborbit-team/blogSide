'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createBlog } from '@/store/slices/blogSlice';
import { BlogFormData } from '@/store/slices/blogSlice';
import Layout from '@/components/Layout/Layout';
import BlogForm from '@/components/Blog/BlogForm';

export default function CreateBlogPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.blog);

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await dispatch(createBlog(data)).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  return (
    <Layout>
      <BlogForm
        onSubmit={handleSubmit}
        isLoading={loading}
        submitText="Create Blog"
      />
    </Layout>
  );
} 