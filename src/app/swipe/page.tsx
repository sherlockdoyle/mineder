'use client';

import GitHub from '@/components/GitHub';
import SwipeStack from '@/components/SwipeStack';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

const SwipePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();

        if (!data.success) router.push('/');
      } catch (_) {
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router]);

  if (isLoading)
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
        <div className='text-xl text-white'>Loading...</div>
      </div>
    );

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
      <div className='absolute top-4 right-4 left-4 z-50 flex items-center justify-between gap-4'>
        <h1 className='mb-2 text-3xl font-bold text-white'>Mineder</h1>

        <div className='flex justify-between gap-2'>
          <GitHub />
          <button
            className='cursor-pointer rounded-full bg-white/10 p-3 text-white backdrop-blur-lg transition-all hover:scale-105 hover:bg-white/20 active:scale-95'
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              router.push('/');
            }}
          >
            <LogOut className='h-5 w-5' />
          </button>
        </div>
      </div>

      <SwipeStack />
    </div>
  );
};
export default SwipePage;
