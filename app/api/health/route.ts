import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if we can connect to the database
    const dbStatus = 'ok'; // In a real app, you would check the database connection here
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dbStatus,
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || 'unknown',
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