'use client';

import { Profile } from '@/data/profiles';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { FC, useRef, useState } from 'react';

export type SwipeAction = 'nope' | 'like' | 'superlike';

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  onSwipe?: (action: SwipeAction) => void;
}
const ProfileCard: FC<ProfileCardProps> = ({ profile, isActive, onSwipe }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]),
    opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]),
    likeOpacity = useTransform(x, [0, 100], [0, 1]),
    superLikeOpacity = useTransform(y, [-100, 0], [1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className='h-full w-full cursor-grab overflow-hidden rounded-3xl bg-white shadow-2xl active:cursor-grabbing'
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (!isActive || !onSwipe) return;

        const { offset } = info;
        if (Math.abs(offset.y) > Math.abs(offset.x) && offset.y < -100)
          onSwipe('superlike'); // up
        else if (offset.x > 100) onSwipe('like'); // right
        // else if (offset.x < -100) onSwipe('nope'); // no left
      }}
      whileHover={isActive ? { scale: 1.02 } : {}}
      style={{ x, y, rotate, opacity }}
    >
      <div className='relative h-3/4 overflow-hidden'>
        <motion.img
          key={imgIndex}
          className='h-full w-full object-cover'
          src={`/api/image/${profile.images[imgIndex]}`}
          alt={profile.name}
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className='absolute top-4 right-0 left-0 flex justify-center space-x-2'>
          {profile.images.map((_, i) => (
            <div
              key={i}
              className={`h-1 max-w-16 flex-1 rounded-full ${i === imgIndex ? 'bg-white' : 'bg-white/30'} transition-all`}
            />
          ))}
        </div>

        <div className='absolute inset-0 flex'>
          <div
            className='flex flex-1 cursor-pointer items-center'
            onClick={() => setImgIndex(prev => (prev === 0 ? profile.images.length - 1 : prev - 1))}
          >
            <ChevronLeft className='h-12 w-12 text-white/30' />
          </div>
          <div
            className='flex flex-1 cursor-pointer items-center justify-end'
            onClick={() => setImgIndex(prev => (prev === profile.images.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className='h-12 w-12 text-white/30' />
          </div>
        </div>

        <motion.div
          className='pointer-events-none absolute top-1/2 right-8 -translate-y-1/2 transform'
          style={{ opacity: nopeOpacity }}
        >
          <div className='rotate-12 rounded-lg bg-red-500 px-4 py-2 text-xl font-bold text-white'>NOPE</div>
        </motion.div>
        <motion.div
          className='pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 transform'
          style={{ opacity: likeOpacity }}
        >
          <div className='-rotate-12 rounded-lg bg-green-500 px-4 py-2 text-xl font-bold text-white'>LIKE</div>
        </motion.div>
        <motion.div
          className='pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 transform'
          style={{ opacity: superLikeOpacity }}
        >
          <div className='rounded-lg bg-blue-500 px-4 py-2 text-xl font-bold text-white'>SUPER LIKE</div>
        </motion.div>
      </div>

      <div className='h-1/4 bg-gradient-to-t from-white to-gray-50 p-6'>
        <div className='mb-2 flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <h2 className='text-2xl font-bold text-gray-800'>{profile.name}</h2>
            <span className='text-xl text-gray-600'>{profile.age}</span>
          </div>
        </div>

        <div className='mb-2 flex items-center text-gray-600'>
          <MapPin className='mr-1 h-4 w-4' />
          <span className='text-sm'>{profile.distance} km away</span>
        </div>

        <p className='text-sm leading-relaxed text-gray-700'>{profile.bio}</p>
      </div>
    </motion.div>
  );
};
export default ProfileCard;
