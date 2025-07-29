import { USER_TOKEN } from '@/data/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (token === USER_TOKEN) return NextResponse.json({ success: true });

  return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
}
