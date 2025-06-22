import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { Types } from 'mongoose';

interface BlogDocument {
  _id: Types.ObjectId;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  isMarkdown: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

function getIdFromUrl(url: string) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

// GET single blog by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = getIdFromUrl(request.url);
    const blog = await Blog.findById(id).lean() as unknown as BlogDocument;
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Ensure dates are properly formatted
    const formattedBlog = {
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: formattedBlog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const id = getIdFromUrl(request.url);
    const body = await request.json();
    const { title, content, imageUrl, category, isMarkdown } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
        imageUrl: imageUrl || '',
        category,
        isMarkdown: isMarkdown || false,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).lean() as unknown as BlogDocument;

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Ensure dates are properly formatted
    const formattedBlog = {
      ...updatedBlog,
      _id: updatedBlog._id.toString(),
      createdAt: updatedBlog.createdAt.toISOString(),
      updatedAt: updatedBlog.updatedAt.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: formattedBlog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const id = getIdFromUrl(request.url);
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 