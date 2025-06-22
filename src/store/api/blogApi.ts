import { BlogFormData } from '../slices/blogSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setBlogs, setSelectedBlog, setLoading, setError } from '../slices/blogSlice';
import type { Blog } from '../slices/blogSlice';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const blogApi = {
  // Get all blogs
  getBlogs: async (params?: { category?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`/api/blogs?${searchParams.toString()}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch blogs');
    }
    return response.json();
  },

  // Get blog by ID
  getBlogById: async (id: string) => {
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch blog');
    }
    return response.json();
  },

  // Create new blog
  createBlog: async (blogData: BlogFormData) => {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create blog');
    }
    return response.json();
  },

  // Update blog
  updateBlog: async (id: string, blogData: BlogFormData) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: blogData.title,
        content: blogData.content,
        imageUrl: blogData.imageUrl || '',
        category: blogData.category,
        isMarkdown: blogData.isMarkdown
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update blog');
    }
    return response.json();
  },

  // Delete blog
  deleteBlog: async (id: string) => {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete blog');
    }
    return response.json();
  },
};

interface CreateBlogData {
  title: string;
  content: string;
  imageUrl?: string;
  category: string;
  isMarkdown: boolean;
}

interface UpdateBlogData extends CreateBlogData {
  id: string;
}

// Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      dispatch(setBlogs(data));
      return data;
    } catch (error) {
      dispatch(setError('Failed to fetch blogs'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Fetch a single blog by ID
export const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog');
      }
      const data = await response.json();
      dispatch(setSelectedBlog(data));
      return data;
    } catch (error) {
      dispatch(setError('Failed to fetch blog'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Create a new blog
export const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blogData: CreateBlogData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          imageUrl: blogData.imageUrl || '',
          category: blogData.category,
          isMarkdown: blogData.isMarkdown,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create blog');
      }

      const data = await response.json();
      
      // After successful creation, fetch updated blog list
      dispatch(fetchBlogs() as any);
      
      return data;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to create blog'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Update an existing blog
export const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, ...blogData }: UpdateBlogData, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          imageUrl: blogData.imageUrl || '',
          category: blogData.category,
          isMarkdown: blogData.isMarkdown,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update blog');
      }

      const data = await response.json();
      
      // After successful update, fetch updated blog list and update selected blog
      dispatch(fetchBlogs() as any);
      dispatch(setSelectedBlog(data));
      
      return data;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to update blog'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

// Delete a blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete blog');
      }

      const data = await response.json();
      
      // After successful deletion, fetch updated blog list and clear selected blog
      dispatch(fetchBlogs() as any);
      dispatch(setSelectedBlog(null));
      
      return data;
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to delete blog'));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
); 