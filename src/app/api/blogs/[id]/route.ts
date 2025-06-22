import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

function getIdFromUrl(url: string) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

// GET single blog by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const id = getIdFromUrl(request.url);
    const blog = await Blog.findById(id).lean();
    
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Ensure dates are properly formatted
    const formattedBlog = {
      ...blog,
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
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
    ).lean();

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Ensure dates are properly formatted
    const formattedBlog = {
      ...updatedBlog,
      createdAt: updatedBlog.createdAt ? new Date(updatedBlog.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: updatedBlog.updatedAt ? new Date(updatedBlog.updatedAt).toISOString() : new Date().toISOString(),
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