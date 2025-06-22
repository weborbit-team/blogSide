import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This route is only available in development' },
      { status: 403 }
    );
  }

  try {
    await connectDB();

    // Drop the blogs collection
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropCollection('blogs');
    }

    // Delete the Blog model from Mongoose's model cache
    if ('Blog' in mongoose.models) {
      delete mongoose.models.Blog;
    }

    return NextResponse.json({ message: 'Database reset successful' });
  } catch (error) {
    console.error('Error resetting database:', error);
    return NextResponse.json(
      { error: 'Failed to reset database' },
      { status: 500 }
    );
  }
} 