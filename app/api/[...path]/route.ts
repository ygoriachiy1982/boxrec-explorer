import { NextRequest, NextResponse } from 'next/server';

const API_BASE = "https://v0-box-rec-api-setup.m5dzpbqd.vercel.app";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const searchParams = request.nextUrl.searchParams;
  
  const url = `${API_BASE}/api/${path}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  const response = await fetch(url, {
    headers: {
      'Cookie': request.headers.get('cookie') || '',
    },
    credentials: 'include',
  });

  const data = await response.json();
  
  // Forward cookies
  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      responseHeaders.append(key, value);
    }
  });

  return NextResponse.json(data, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const body = await request.json();
  
  const url = `${API_BASE}/api/${path}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': request.headers.get('cookie') || '',
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await response.json();
  
  // Forward cookies
  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      responseHeaders.append(key, value);
    }
  });

  return NextResponse.json(data, {
    status: response.status,
    headers: responseHeaders,
  });
}
