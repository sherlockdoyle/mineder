import { USER_TOKEN } from '@/data/user';
import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const EXT_TO_TYPE: Record<string, string> = { jpg: 'jpeg', svg: 'svg+xml' };

export async function GET(request: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const token = request.cookies.get('auth-token')?.value;
  if (!token || token !== USER_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await params;
  const imgPath = path.join(process.cwd(), 'images', name.replace(/[^a-zA-Z0-9\-_.]/g, ''));
  const ext = path.extname(imgPath).slice(1);

  try {
    const image = await readFile(imgPath);
    return new NextResponse(image, {
      headers: {
        'Content-Type': `image/${EXT_TO_TYPE[ext] ?? ext}`,
        'Cache-Control': 'public, max-age=86400',
        'Content-Length': image.length.toString(),
      },
    });
  } catch (_) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }
}
