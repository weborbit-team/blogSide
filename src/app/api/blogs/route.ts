import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = {};
    
    if (category) {
      query.category = category;
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, content, imageUrl, category, isMarkdown } = body;

    // Validation
    if (!title || !content || !category) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields. Title, content, and category are required.' 
        },
        { status: 400 }
      );
    }

    const blog = new Blog({
      title,
      content,
      imageUrl: imageUrl || '',
      category,
      isMarkdown: isMarkdown || false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedBlog = await blog.save();

    return NextResponse.json({
      success: true,
      data: savedBlog,
      message: 'Blog created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create blog'
      },
      { status: 500 }
    );
  }
} 