'use client';

import { Profile } from '@/data/profiles';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import ActionButtons from './ActionButtons';
import ProfileCard, { SwipeAction } from './ProfileCard';

const SwipeStack: FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeAction, setSwipeAction] = useState<SwipeAction>();
  function handleSwipe(action: SwipeAction) {
    setSwipeAction(action);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setSwipeAction(undefined), 500);
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/api/profiles');
        const data = await response.json();
        if (data.profiles) setProfiles(data.profiles);
        else setError('Failed to load profiles. Please try again later.');
      } catch (_) {
        setError('Failed to load profiles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const currentProfile = profiles[currentIndex],
    nextProfile = profiles[currentIndex + 1];

  if (isLoading || error || !currentProfile)
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <motion.div
          className='text-center text-white'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {isLoading ? (
            <div className='text-xl text-white'>Loading...</div>
          ) : error ? (
            <p className='text-lg text-red-500'>{error}</p>
          ) : (
            <>
              <h2 className='mb-4 text-3xl font-bold'>No more profiles!</h2>
              <p className='text-white/70'>Reload the page for more profiles.</p>
            </>
          )}
        </motion.div>
      </div>
    );

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4 pb-32'>
      <div className='relative h-[70vh] w-full max-w-sm perspective-distant'>
        <AnimatePresence>
          {nextProfile && (
            <div key={nextProfile.id} className='absolute inset-0 z-10 scale-95 opacity-80'>
              <ProfileCard isActive={false} profile={nextProfile} />
            </div>
          )}

          <motion.div
            key={currentProfile.id}
            className='absolute inset-0 z-20'
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <ProfileCard isActive profile={currentProfile} onSwipe={handleSwipe} />
          </motion.div>
        </AnimatePresence>
      </div>

      <ActionButtons swipeAction={swipeAction} onSwipe={handleSwipe} />
    </div>
  );
};
export default SwipeStack;
