import { AGE, BIOS, DISTANCE, INTERESTS, NAMES, Profile } from '@/data/profiles';
import { USER_TOKEN } from '@/data/user';
import { readdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

let images: string[] | undefined;
async function getImages(): Promise<string[]> {
  if (!images) images = await readdir(path.join(process.cwd(), 'images'));
  return images;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token || token !== USER_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const profiles = Array<Profile>();
    const numProfiles = Math.floor(Math.random() * 6) + 5;
    for (let i = 0; i < numProfiles; ++i) {
      const numImages = Math.floor(Math.random() * 4) + 2,
        numInterests = Math.floor(Math.random() * 3) + 1;

      profiles.push({
        id: i,
        name: randomElement(NAMES),
        age: AGE ?? Math.floor(Math.random() * 25) + 18,
        bio: [...shuffle(INTERESTS).slice(0, numInterests), randomElement(BIOS)].join(' '),
        images: shuffle(await getImages()).slice(0, numImages),
        distance: DISTANCE ?? Math.floor(Math.random() * 50) + 1,
      });
    }

    return NextResponse.json({ profiles });
  } catch (_) {
    return NextResponse.json({ error: 'Failed to fetch profiles' }, { status: 500 });
  }
}
