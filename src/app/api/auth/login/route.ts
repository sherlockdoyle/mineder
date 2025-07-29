import { USER_TOKEN } from '@/data/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const token = Buffer.from(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${username}:${password}`)),
    ).toString('base64');

    if (token !== USER_TOKEN) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const response = NextResponse.json({ success: true });
    response.cookies.set('auth-token', token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
