'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Switch,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown-light.css';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000&auto=format&fit=crop';

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    isMarkdown?: boolean;
  };
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    category: initialData?.category || 'General',
    isMarkdown: initialData?.isMarkdown || false,
  });
  const [error, setError] = useState('');
  const tags = useSelector((state: RootState) => state.blog.tags);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    const finalData = {
      ...formData,
      imageUrl: formData.imageUrl.trim() || DEFAULT_IMAGE,
    };

    onSubmit(finalData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleMarkdown = () => {
    setFormData(prev => ({ ...prev, isMarkdown: !prev.isMarkdown }));
  };

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            name="title"
            label="Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            placeholder="Enter an engaging title"
          />

          <TextField
            name="imageUrl"
            label="Cover Image URL (optional)"
            value={formData.imageUrl}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            placeholder="Enter image URL or leave empty for default cover"
            helperText="Leave empty to use a default cover image"
          />

          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={formData.category}
              label="Category"
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={formData.isMarkdown}
                onChange={toggleMarkdown}
                color="primary"
              />
            }
            label="Use Markdown Editor"
          />

          {formData.isMarkdown ? (
            <Grid container spacing={2} sx={{ minHeight: 400 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="content"
                  label="Markdown Content"
                  value={formData.content}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={16}
                  variant="outlined"
                  placeholder="Write your blog post content in Markdown..."
                  sx={{
                    '& .MuiInputBase-root': {
                      fontFamily: 'monospace',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    height: '100%', 
                    overflow: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Preview
                  </Typography>
                  <Box className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content}
                    </ReactMarkdown>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <TextField
              name="content"
              label="Content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={12}
              variant="outlined"
              placeholder="Write your blog post content here..."
            />
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.2s',
              },
            }}
          >
            {isLoading ? 'Saving...' : initialData ? 'Update Post' : 'Publish Post'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default BlogForm; 