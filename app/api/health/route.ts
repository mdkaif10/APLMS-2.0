import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';

export async function GET() {
  try {
    // Check environment variables
    const requiredEnvVars = [
      'MONGODB_URI',
      'APP_KEY',
      'VIOLATION_EMAIL',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Missing required environment variables',
          missingVars: missingEnvVars,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // Check database connection
    let dbStatus = 'error';
    try {
      await connectToDB();
      dbStatus = 'ok';
    } catch (error) {
      console.error('Database connection failed:', error);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dbStatus,
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || 'unknown',
      envVars: {
        hasMongoDB: !!process.env.MONGODB_URI,
        hasAppKey: !!process.env.APP_KEY,
        hasViolationEmail: !!process.env.VIOLATION_EMAIL,
        hasClerk: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && !!process.env.CLERK_SECRET_KEY,
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
} 