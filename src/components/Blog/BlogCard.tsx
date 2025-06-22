'use client';

import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@/store/hooks';
import { deleteBlog } from '@/store/slices/blogSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1000&auto=format&fit=crop';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    createdAt: string;
    isMarkdown?: boolean;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getExcerpt = (content: string) => {
    // Remove markdown syntax for plain text excerpt
    const plainText = content.replace(/[#*`_~\[\]]/g, '').replace(/\n/g, ' ');
    return truncateText(plainText, 250);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking delete
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await dispatch(deleteBlog(blog._id));
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking edit
    router.push(`/edit/${blog._id}`);
  };

  const handleCardClick = () => {
    router.push(`/blog/${blog._id}`);
  };

  return (
    <Paper
      elevation={0}
      onClick={handleCardClick}
      sx={{
        display: 'flex',
        gap: 3,
        p: 3,
        mb: 2,
        backgroundColor: 'background.paper',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          width: { xs: 120, sm: 200 },
          height: { xs: 120, sm: 150 },
          overflow: 'hidden',
        }}
      >
        <img
          src={blog.imageUrl || DEFAULT_IMAGE}
          alt={blog.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={blog.category}
            size="small"
            sx={{ 
              height: 24,
              fontSize: '0.75rem',
              backgroundColor: 'primary.main',
              color: 'white',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
          <Stack direction="row" spacing={1}>
            <IconButton 
              size="small" 
              onClick={handleEdit}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleDelete}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'white',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            transition: 'color 0.2s ease-in-out',
          }}
        >
          {blog.title}
        </Typography>

        <Box sx={{ mb: 2, color: 'text.primary' }}>
          {blog.isMarkdown ? (
            <Box 
              className="markdown-body" 
              sx={{ 
                '& *': { 
                  color: 'text.primary',
                  fontFamily: 'var(--font-primary)',
                },
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  mb: 1,
                },
                '& p': {
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  mb: 2,
                },
                '& a': { 
                  color: 'primary.light',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& code': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'text.primary',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.875rem',
                },
                '& blockquote': {
                  borderLeftColor: 'primary.main',
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  mx: 0,
                  my: 1,
                  py: 0.5,
                },
                '& ul, & ol': {
                  pl: 2,
                  mb: 1,
                },
                '& li': {
                  mb: 0.5,
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {getExcerpt(blog.content)}
              </ReactMarkdown>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--font-primary)',
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                color: 'text.primary',
              }}
            >
              {getExcerpt(blog.content)}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
            }}
          >
            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BlogCard; 