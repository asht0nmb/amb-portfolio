import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface MapCoordinate {
  z: string;
  x: string;
  y: string;
}

const RATE_LIMIT = 100; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Simple in-memory rate limiting
const requestCounts = new Map<string, number[]>();

const generateMapUrl = ({ z, x, y }: MapCoordinate): string => {
  const apiKey = process.env.MAPTILER_API_KEY;
  if (!apiKey) {
    throw new Error('MAPTILER_API_KEY is not set');
  } 
  return `https://api.maptiler.com/maps/streets-v2-dark/${z}/${x}/${y}.png?key=${apiKey}`;
};

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Get existing requests for this IP
  const requests = requestCounts.get(ip) || [];
  
  // Filter out old requests
  const recentRequests = requests.filter(time => time > windowStart);
  
  // Update the request count
  requestCounts.set(ip, [...recentRequests, now]);
  
  return recentRequests.length >= RATE_LIMIT;
};

export async function GET(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Validate API key
    if (!process.env.MAPTILER_API_KEY) {
      return NextResponse.json(
        { error: 'Map service is not configured' },
        { status: 500 }
      );
    }

    // Get and validate parameters
    const searchParams = request.nextUrl.searchParams;
    const z = searchParams.get('z');
    const x = searchParams.get('x');
    const y = searchParams.get('y');

    if (!z || !x || !y) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Validate coordinate ranges
    const zNum = parseInt(z);
    const xNum = parseInt(x);
    const yNum = parseInt(y);

    if (isNaN(zNum) || isNaN(xNum) || isNaN(yNum) ||
        zNum < 0 || zNum > 20 ||
        xNum < 0 || xNum >= Math.pow(2, zNum) ||
        yNum < 0 || yNum >= Math.pow(2, zNum)) {
      return NextResponse.json(
        { error: 'Invalid coordinates' },
        { status: 400 }
      );
    }

    const response = await fetch(generateMapUrl({ z, x, y }));
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error fetching tile' },
        { status: response.status }
      );
    }

    const tileData = await response.arrayBuffer();
    
    return new NextResponse(tileData, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Map tile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}